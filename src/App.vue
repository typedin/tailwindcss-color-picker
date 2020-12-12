<template>
  <div class="w-screen flex justify-between">
    <div
      v-for="name in names"
      :key="name"
      class="flex-1 h-screen flex flex-col"
    >
      <div
        class="flex-1"
        v-for="(rgb, shade) in getShades(name)"
        :key="rgb"
        :style="`background-color: ${rgb}`"
      >
        <button
          :title="`${rgb} (${name}-${shade})`"
          class="block w-full h-full ring-0"
          @click="copyToClipboard({ name: `${name}-${shade}`, rgb: rgb })"
        />
      </div>
    </div>
  </div>
  <transition
    mode="out-in"
    enter-active-class="transition-all duration-1000 ease-out-quad"
    leave-active-class="transition-all duration-1000 ease-in-quad"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="toast.isVisible"
      class="absolute bottom-0 right-0 bg-white rounded-l px-4 py-2"
      :class="[
        toast.hasError
          ? 'text-red-800 bg-red-300'
          : 'text-green-800 bg-green-300'
      ]"
    >
      <div class="flex items-center">
        <button class="flex items-center" @click="hideToast">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <span class="ml-4 flex justify-between items-center">
          <span>
            {{ toast.message }}
          </span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="toast.hasError"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
            <path
              v-if="!toast.hasError"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import palette from "@/modules/colors";
export default {
  name: "ColorPalette",
  setup() {
    const names = palette.names;
    const getShades = palette.shades;
    return { names, getShades };
  },
  data() {
    return {
      toast: {
        message: "",
        hasError: false,
        isVisible: false
      }
    };
  },
  methods: {
    copyToClipboard(args) {
      navigator.clipboard
        .writeText(args.rgb)
        .then(() => {
          this.toast.hasError = false;
          this.toast.message = `Copied ${args.rgb} to clipboard.`;
        })
        .catch(e => {
          if (e) {
            console.error(e);
          }
          this.toast.hasError = true;
          this.toast.message = `Could not copy ${args.rgb} to clipboard.`;
        })
        .finally(() => {
          this.showToast();
        });
    },
    showToast() {
      this.toast.isVisible = true;
      if (!this.toast.hasError) {
        setTimeout(() => {
          this.hideToast();
        }, 3000);
      }
    },
    hideToast() {
      this.toast.isVisible = false;
    }
  }
};
</script>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import socket from '../plugins/socket'
  const name = ref()
  const messages = ref<any>([])
  const messageText = ref()
  const joined = ref(false)
  const typingDisplay = ref()

  const join = () => {
    socket.emit('join', { name: name.value }, () => {
      joined.value = true
    })
  }

  const sendMessage = () => {
    socket.emit('createMessage', { text: messageText.value }, () => {
      messageText.value = ''
      scollBottom()
    })
  }

  let timeout
  const emitTyping = () => {
    socket.emit('typing', { isTyping: true })
    timeout = setTimeout(() => {
      socket.emit('typing', { isTyping: false })
    }, 2000)
  }

  const scollBottom = () => {
    let el: any = document.getElementById('messages')
    el.scrollTop = el.scrollHeight
  }

  onBeforeMount(() => {
    socket.emit('findAllMessages', {}, (res: any) => {
      messages.value = res
    })

    socket.on('message', (message: any) => {
      messages.value.push(message)
      scollBottom()
    })

    socket.on('typing', ({ name, isTyping }) => {
      scollBottom()
      if (isTyping) {
        typingDisplay.value = `${name} กำลังพิมพ์...`
      } else {
        typingDisplay.value = ''
      }
    })
  })
</script>

<template>
  <div v-if="!joined" class="chat absolute top-1/3 left-1/3">
    <div>
      <form @submit.prevent="join()">
        <label>What's your name?</label>
        <input
          v-model="name"
          type="text"
          placeholder="พิมพ์ชื่อของคุณ"
          class="input border-2 p-2"
        />
        <button type="submit" class="button">Send</button>
      </form>
    </div>
  </div>

  <!-- component -->
  <div v-else class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
    <div
      class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200"
    >
      <div class="relative flex items-center space-x-4">
        <div class="relative">
          <span class="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src="../assets/user (3).png"
            class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
        </div>
        <div class="flex flex-col leading-tight">
          <div class="text-2xl mt-1 flex items-center">
            <span class="text-gray-700 mr-3">{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      id="messages"
      class="h-full flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div v-for="message in messages" :key="message.text" class="chat-message">
        <div
          class="flex items-end"
          :class="{ 'justify-end': message.name === name }"
        >
          <div
            class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
            :class="{
              'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end':
                message.name === name,
            }"
          >
            <div>
              <span
                class="px-4 py-2 text-base rounded-lg inline-block rounded-bl-none bg-gray-200 text-black"
                :class="{ 'bg-blue-100': message.name === name }"
                ><b class="text-lg font-extrabold">{{ message.name }}:</b>
                {{ message.text }}</span
              >
            </div>
          </div>
          <img
            :src="
              message.name === name
                ? './src/assets/user (4).png'
                : './src/assets/user (4).png'
            "
            alt="profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
      <div v-if="typingDisplay" class="chat-message">
        <div class="flex items-end">
          <img
            src="../assets/user (1).png"
            alt="profile"
            class="w-6 h-6 rounded-full order-2"
          />
          <div
            class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
          >
            <div>
              <span
                class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                >{{ typingDisplay }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <form @submit.prevent="sendMessage()" class="relative flex">
        <input
          v-model="messageText"
          @input="emitTyping"
          type="text"
          placeholder="พิมพ์ข้อความ"
          class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3"
        />
        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="submit"
            class="mr-2 inline-flex items-center justify-center rounded-lg px-2 py-2 transition duration-500 ease-in-out text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-6 w-6 ml-2 transform rotate-90 fill-blue-500"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .scrollbar-w-2::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
  }

  .scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity));
  }

  .scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    --bg-opacity: 1;
    background-color: #edf2f7;
    background-color: rgba(237, 242, 247, var(--bg-opacity));
  }

  .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
  }

  .input {
    margin-left: 5px;
    border-radius: 10px;
  }

  .button {
    border: 1px solid black;
    border-radius: 10px;
    padding: 8px;
    margin-left: 2px;
  }
</style>

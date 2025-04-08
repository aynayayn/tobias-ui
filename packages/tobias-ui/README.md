# Install and use

1. create a project via vite
   `pnpm vite create`，设定项目名称，选择开发框架和开发语言，完成项目创建

2. 进入所创建的项目中
   
3. `pnpm install tobias-ui @tobias-ui/icons`

4. 在`main.ts`中注册`tobias-ui`库提供的所有组件
   ```typescript
   import { createApp } from 'vue'
   import App from './App.vue'
   import tobiasUI from 'tobias-ui'
   import 'tobias-ui/dist/tobias-ui.css'
   
   const app = createApp(App)
   app.use(tobiasUI)
   app.mount('#app')

5. 使用`tobias-ui`库
   1. 按需导入使用
   
      ```vue
      <script setup lang="ts">
      import { Button, Notification } from 'tobias-ui'
      
      function handleClick() {
        const close = Notification.info({
          title: '提示',
          content: '这是一条提示信息'
        })
      
        setTimeout(() => {
          close()
        }, 2000)
      }
      </script>
      
      <template>
        <div>
          <Button @click="handleClick">
            按钮
          </Button>
        </div>
      </template>
      ```
   
   2. 通过组件的注册名称使用
   
      ```vue
      <script setup lang="ts">
      import { getCurrentInstance } from 'vue'
      
      const instance = getCurrentInstance()
      
      function handleClick() {
        if (instance) {
          const close = instance.appContext.config.globalProperties.$notification?.info({
            title: '提示',
            content: '这是一条提示信息'
          })
      
          setTimeout(() => {
            close?.()
          }, 2000)
        }
      }
      </script>
      
      <template>
        <div>
          <t-button @click="handleClick">
            按钮
          </t-button>
        </div>
      </template>
      ```
   
6. 使用`@tobias-ui/icons`库

   ```vue
   <script setup lang="ts">
   import { Loading } from '@tobias-ui/icons'
   </script>
   
   <template>
     <div>
       <Loading style="font-size: 100px;" />
     </div>
   </template>
   ```

   

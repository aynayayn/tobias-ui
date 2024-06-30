# Notification 通知弹出框

<demo src="./demos/basic.vue"></demo>

## 创建一个函数式组件
1. 编写一个单文件组件（SFC）或者使用tsx编写一个组件
2. 在该组件中expose出操作响应式数据的方法合集instance
3. 在该组件的props中新增onReady属性，该属性为一个函数，该函数可传入一个参数
4. 在组件的mounted钩子中检测props.onReady是否存在并且为一个函数，若判断成立，则执行该函数并将instance传入
5. 新创建一个js/ts文件，导出一个函数
6. 在该函数中手动控制组件的渲染，使用h/createVNode函数创建虚拟节点，记得在第二个对象参数中定义一个onReady函数，来接收组件挂载时传出的操作响应式数据的方法合集并保存至特定变量中
7. 指定创建的虚拟节点的appContext
8. 将创建的虚拟节点挂载到指定的dom节点上
9. 给instance中的方法分别加一层“包装”，导出这些方法

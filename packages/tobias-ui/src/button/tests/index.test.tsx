import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { Button } from 'tobias-ui'

describe('button', () => {
  // 特定的功能点的测试
  it('should work', () => {
    // wrapper是一个VueWrapper
    const wrapper: VueWrapper = mount(<Button type="primary">测试</Button>)
    // btnEl是一个DOMWrapper
    const btnWrapper: DOMWrapper<HTMLButtonElement> = wrapper.find('button')
    // btnEl是dom元素
    const btnEl = btnWrapper.element
    const hasPrimary = btnEl.classList.contains('tobias-button--primary')
    expect(hasPrimary).toBe(true)
    wrapper.unmount()
  })

  it('size', () => {
    const wrapper: VueWrapper = mount(<Button size="small">测试</Button>)
    const btnWrapper: DOMWrapper<HTMLButtonElement> = wrapper.find('button')
    const btnEl = btnWrapper.element
    const targetClassName = 'tobias-button-size--small'
    const containTargetClassName = btnEl.classList.contains(targetClassName)
    expect(containTargetClassName).toBe(true)
    wrapper.unmount()
  })

  it('clickable', () => {
    let clickState = false
    const handleClick = () => {
      clickState = true
    }
    const wrapper: VueWrapper = mount(<Button onClick={handleClick}>测试</Button>)
    wrapper.trigger('click')
    expect(clickState).toBe(true)
    wrapper.unmount()
  })
})

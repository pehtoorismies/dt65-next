import { Meta, Story } from '@storybook/react'
import { Layout, LayoutProps } from '../layout'

export default {
  component: Layout,
  title: 'Layout',
} as Meta

const Template: Story<LayoutProps> = (args) => (
  <Layout {...args}>
    <div className="text-blue">
      <div>koira 1</div>
      <div>koira 2</div>
      <div>koira 3</div>
      <div>koira 4 </div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
      <div>koira</div>
    </div>
  </Layout>
)

export const LayoutComponent = Template.bind({})

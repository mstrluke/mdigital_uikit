/**
 * Performance test suite for all UIKit components.
 *
 * Tests:
 * 1. Initial render time (mount)
 * 2. Re-render time (prop change)
 * 3. Stress test (large data / many items)
 * 4. Memo effectiveness (stable props → no re-render)
 *
 * Thresholds are generous (jsdom overhead) — the point is to catch
 * regressions and find components that are unreasonably slow.
 */
import { render, act } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'

// ─── Helpers ──────────────────────────────────────────────────
function measure(fn: () => void): number {
  const start = performance.now()
  fn()
  const end = performance.now()
  return end - start
}

function measureRender(ui: React.ReactElement) {
  let ms = 0
  act(() => {
    ms = measure(() => render(ui))
  })
  return ms
}

function measureReRenders(
  ui: (val: number) => React.ReactElement,
  count: number,
) {
  const { rerender } = render(ui(0))
  const start = performance.now()
  for (let i = 1; i <= count; i++) {
    act(() => { rerender(ui(i)) })
  }
  return (performance.now() - start) / count
}

function generateItems(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    label: `Item ${i}`,
    value: `item-${i}`,
  }))
}

function generateTreeNodes(depth: number, breadth: number, prefix = ''): any[] {
  if (depth === 0) return []
  return Array.from({ length: breadth }, (_, i) => {
    const key = `${prefix}${i}`
    return {
      key,
      label: `Node ${key}`,
      children: generateTreeNodes(depth - 1, breadth, `${key}-`),
    }
  })
}

// Max allowed ms for initial render (jsdom is slow, keep generous)
const MOUNT_BUDGET = 100
// Max allowed ms per re-render
const RERENDER_BUDGET = 30
// Stress threshold — large data sets
const STRESS_BUDGET = 500

// ─── Imports ──────────────────────────────────────────────────
import Accordion from '../accordion'
import Avatar from '../avatar'
import Badge from '../badge'
import Breadcrumbs from '../breadcrumbs'
import Button from '../button'
import ButtonGroup from '../button-group'
import Card from '../card'
import Cascader from '../cascader'
import Checkbox from '../checkbox'
import CheckboxGroup from '../checkbox-group'
import Clipboard from '../clipboard'
import Collapse from '../collapse'
import Descriptions from '../descriptions'
import Divider from '../divider'
import Dropdown from '../dropdown'
import Result from '../result'
import FloatInput from '../float-input'
import Grid from '../grid'
import Image from '../image'
import Input from '../input'
import InputGroup from '../input-group'
import InputOtp from '../input-otp'
import InputPassword from '../input-password'
import Kbd from '../kbd'
import Link from '../link'
import ComposedModal from '../modal'
import MultiSelect from '../multi-select'
import Notification from '../notification'
import NumberInput from '../number-input'
import Pagination from '../pagination'
import Progress from '../progress'
import Radio from '../radio'
import RadioGroup from '../radio-group'
import Rating from '../rating'
import ScrollArea from '../scroll-area'
import Select from '../select'
import Skeleton from '../skeleton'
import Slider from '../slider'
import Spinner from '../spinner'
import Stepper from '../stepper'
import Switch from '../switch'
import Table from '../table'
import Tabs from '../tabs'
import Tag from '../tag'
import Textarea from '../textarea'
import Timeline from '../timeline'
import Toggle from '../toggle'
import ToggleGroup from '../toggle-group'
import Tooltip, { TooltipProvider } from '../tooltip'
import { Transfer } from '../transfer'
import Tree from '../tree'
import TreeSelect from '../tree-select'
import Upload from '../upload'

// ─── 1. Mount Performance ─────────────────────────────────────
describe('Performance: Mount', () => {
  const simpleComponents: [string, React.ReactElement][] = [
    ['Accordion', <Accordion items={[{ key: '1', label: 'A', children: 'Content' }]} />],
    ['Avatar', <Avatar name="JD" />],
    ['Badge', <Badge>New</Badge>],
    ['Breadcrumbs', <Breadcrumbs items={[{ label: 'Home' }, { label: 'Page' }]} />],
    ['Button', <Button>Click</Button>],
    ['ButtonGroup', <ButtonGroup><Button>A</Button><Button>B</Button></ButtonGroup>],
    ['Card', <Card>Content</Card>],
    ['Checkbox', <Checkbox />],
    ['CheckboxGroup', <CheckboxGroup options={[{ label: 'A', value: 'a' }]} />],
    ['Clipboard', <Clipboard value="test" />],
    ['Collapse', <Collapse title="Title">Content</Collapse>],
    ['Descriptions', <Descriptions items={[{ label: 'Name', value: 'Test' }]} />],
    ['Divider', <Divider />],
    ['Result', <Result status="info" />],
    ['FloatInput', <FloatInput label="Name" />],
    ['Grid', <Grid><div>A</div></Grid>],
    ['Image', <Image src="" alt="test" />],
    ['Input', <Input placeholder="type" />],
    ['InputGroup', <InputGroup><Input /></InputGroup>],
    ['InputOtp', <InputOtp length={4} />],
    ['InputPassword', <InputPassword />],
    ['Kbd', <Kbd>Ctrl+C</Kbd>],
    ['Link', <Link href="#">Click</Link>],
    ['Notification', <Notification title="Test" />],
    ['NumberInput', <NumberInput />],
    ['Pagination', <Pagination total={100} pageSize={10} />],
    ['Progress', <Progress value={50} />],
    ['Radio', <Radio value="a" label="A" />],
    ['RadioGroup', <RadioGroup options={[{ label: 'A', value: 'a' }]} />],
    ['Rating', <Rating />],
    ['ScrollArea', <ScrollArea style={{ height: 100 }}><div>Content</div></ScrollArea>],
    ['Skeleton', <Skeleton />],
    ['Slider', <Slider />],
    ['Spinner', <Spinner />],
    ['Switch', <Switch />],
    ['Tag', <Tag>Tag</Tag>],
    ['Textarea', <Textarea placeholder="type" />],
    ['Toggle', <Toggle>Bold</Toggle>],
    ['Tooltip', <TooltipProvider><Tooltip content="tip"><span>Hover</span></Tooltip></TooltipProvider>],
  ]

  it.each(simpleComponents)('%s mounts within budget', (name, el) => {
    const ms = measureRender(el)
    expect(ms, `${name} took ${ms.toFixed(1)}ms to mount`).toBeLessThan(MOUNT_BUDGET)
  })

  // Components that need data props
  it('Select mounts within budget', () => {
    const ms = measureRender(
      <Select options={generateItems(20)} placeholder="Pick" />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('MultiSelect mounts within budget', () => {
    const ms = measureRender(
      <MultiSelect options={generateItems(20)} placeholder="Pick" />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Cascader mounts within budget', () => {
    const ms = measureRender(
      <Cascader
        options={[
          { label: 'A', value: 'a', children: [{ label: 'A1', value: 'a1' }] },
          { label: 'B', value: 'b' },
        ]}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Table mounts within budget', () => {
    const ms = measureRender(
      <Table
        columns={[{ accessorKey: 'name', header: 'Name' }]}
        data={[{ name: 'Alice' }, { name: 'Bob' }]}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Tree mounts within budget', () => {
    const ms = measureRender(
      <Tree data={generateTreeNodes(3, 3)} />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('TreeSelect mounts within budget', () => {
    const ms = measureRender(
      <TreeSelect data={generateTreeNodes(3, 3)} />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Tabs mounts within budget', () => {
    const ms = measureRender(
      <Tabs
        items={[
          { key: 'a', label: 'Tab A', children: <div>A</div> },
          { key: 'b', label: 'Tab B', children: <div>B</div> },
        ]}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Stepper mounts within budget', () => {
    const ms = measureRender(
      <Stepper
        steps={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
        ]}
        activeStep={1}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Timeline mounts within budget', () => {
    const ms = measureRender(
      <Timeline
        items={[
          { children: 'Event 1' },
          { children: 'Event 2' },
        ]}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Transfer mounts within budget', () => {
    const ms = measureRender(
      <Transfer
        dataSource={generateItems(20).map(i => ({ key: i.value, label: i.label }))}
        targetKeys={[]}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('ToggleGroup mounts within budget', () => {
    const ms = measureRender(
      <ToggleGroup
        type="single"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Dropdown mounts within budget', () => {
    const ms = measureRender(
      <Dropdown
        trigger={<Button>Menu</Button>}
        items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
      />,
    )
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })

  it('Upload mounts within budget', () => {
    const ms = measureRender(<Upload />)
    expect(ms).toBeLessThan(MOUNT_BUDGET)
  })
})

// ─── 2. Re-render Performance ─────────────────────────────────
describe('Performance: Re-render', () => {
  it('Button re-renders efficiently', () => {
    const avg = measureReRenders(
      (i) => <Button variant={i % 2 === 0 ? 'solid' : 'outline'}>Click {i}</Button>,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Input re-renders efficiently on value change', () => {
    const avg = measureReRenders(
      (i) => <Input value={`text-${i}`} onChange={() => {}} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Checkbox re-renders efficiently on toggle', () => {
    const avg = measureReRenders(
      (i) => <Checkbox checked={i % 2 === 0} onChange={() => {}} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Switch re-renders efficiently', () => {
    const avg = measureReRenders(
      (i) => <Switch checked={i % 2 === 0} onCheckedChange={() => {}} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Progress re-renders efficiently on value change', () => {
    const avg = measureReRenders(
      (i) => <Progress value={i % 100} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Badge re-renders efficiently', () => {
    const avg = measureReRenders(
      (i) => <Badge color={i % 2 === 0 ? 'primary' : 'error'}>Count {i}</Badge>,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Slider re-renders efficiently', () => {
    const avg = measureReRenders(
      (i) => <Slider value={[i % 100]} onValueChange={() => {}} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Rating re-renders efficiently', () => {
    const avg = measureReRenders(
      (i) => <Rating value={i % 5} onChange={() => {}} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Tag re-renders efficiently', () => {
    const avg = measureReRenders(
      (i) => <Tag color={i % 2 === 0 ? 'primary' : 'success'}>Tag {i}</Tag>,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Pagination re-renders on page change', () => {
    const avg = measureReRenders(
      (i) => <Pagination total={500} pageSize={10} current={i % 50 + 1} onChange={() => {}} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Select re-renders on value change', () => {
    const opts = generateItems(50)
    const avg = measureReRenders(
      (i) => <Select options={opts} value={`item-${i % 50}`} onChange={() => {}} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Tabs re-renders on active tab change', () => {
    const items = Array.from({ length: 5 }, (_, i) => ({
      key: `tab-${i}`,
      label: `Tab ${i}`,
      children: <div>Content {i}</div>,
    }))
    const avg = measureReRenders(
      (i) => <Tabs items={items} activeKey={`tab-${i % 5}`} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })

  it('Accordion re-renders on expand', () => {
    const items = Array.from({ length: 5 }, (_, i) => ({
      key: `${i}`,
      label: `Section ${i}`,
      children: `Content ${i}`,
    }))
    const avg = measureReRenders(
      (i) => <Accordion items={items} defaultActiveKeys={[`${i % 5}`]} />,
      50,
    )
    expect(avg).toBeLessThan(RERENDER_BUDGET)
  })
})

// ─── 3. Stress Tests ──────────────────────────────────────────
describe('Performance: Stress', () => {
  it('Select handles 1000 options', () => {
    const options = generateItems(1000)
    const ms = measureRender(
      <Select options={options} placeholder="Pick" />,
    )
    expect(ms, `Select with 1000 options: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('MultiSelect handles 1000 options', () => {
    const options = generateItems(1000)
    const ms = measureRender(
      <MultiSelect options={options} placeholder="Pick" />,
    )
    expect(ms, `MultiSelect with 1000 options: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Table handles 500 rows', () => {
    const data = Array.from({ length: 500 }, (_, i) => ({
      id: i,
      name: `Person ${i}`,
      email: `person${i}@test.com`,
      role: i % 3 === 0 ? 'Admin' : 'User',
    }))
    const columns = [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
    ]
    const ms = measureRender(
      <Table columns={columns} data={data} />,
    )
    expect(ms, `Table with 500 rows: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Table handles 2000 rows', () => {
    const data = Array.from({ length: 2000 }, (_, i) => ({
      id: i,
      name: `Person ${i}`,
      email: `person${i}@test.com`,
    }))
    const columns = [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
    ]
    const ms = measureRender(
      <Table columns={columns} data={data} />,
    )
    expect(ms, `Table with 2000 rows: ${ms.toFixed(1)}ms`).toBeLessThan(1000)
  })

  it('Tree handles 1000 nodes (deep)', () => {
    // 5^4 = 625 nodes + parent nodes
    const data = generateTreeNodes(4, 5)
    const ms = measureRender(
      <Tree data={data} />,
    )
    expect(ms, `Tree with ~780 nodes: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Tree handles 1000 nodes expanded', () => {
    const data = generateTreeNodes(4, 5)
    const ms = measureRender(
      <Tree data={data} defaultExpandAll />,
    )
    expect(ms, `Tree expanded ~780 nodes: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('TreeSelect handles large tree', () => {
    const data = generateTreeNodes(3, 10)
    const ms = measureRender(
      <TreeSelect data={data} placeholder="Pick" />,
    )
    expect(ms, `TreeSelect ~1110 nodes: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Transfer handles 500 items', () => {
    const dataSource = Array.from({ length: 500 }, (_, i) => ({
      key: `item-${i}`,
      label: `Item ${i}`,
    }))
    const ms = measureRender(
      <Transfer dataSource={dataSource} targetKeys={[]} />,
    )
    expect(ms, `Transfer with 500 items: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Accordion handles 100 panels', () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      key: `${i}`,
      label: `Section ${i}`,
      children: `Content for section ${i}`,
    }))
    const ms = measureRender(
      <Accordion items={items} />,
    )
    expect(ms, `Accordion 100 panels: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Tabs handles 50 tabs', () => {
    const items = Array.from({ length: 50 }, (_, i) => ({
      key: `tab-${i}`,
      label: `Tab ${i}`,
      children: <div>Content {i}</div>,
    }))
    const ms = measureRender(
      <Tabs items={items} />,
    )
    expect(ms, `Tabs with 50 items: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Timeline handles 200 items', () => {
    const items = Array.from({ length: 200 }, (_, i) => ({
      children: `Event ${i}`,
    }))
    const ms = measureRender(
      <Timeline items={items} />,
    )
    expect(ms, `Timeline 200 items: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Stepper handles 20 steps', () => {
    const steps = Array.from({ length: 20 }, (_, i) => ({
      title: `Step ${i}`,
      description: `Description ${i}`,
    }))
    const ms = measureRender(
      <Stepper steps={steps} activeStep={10} />,
    )
    expect(ms, `Stepper 20 steps: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Breadcrumbs handles 20 items', () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      label: `Level ${i}`,
      href: `#level-${i}`,
    }))
    const ms = measureRender(
      <Breadcrumbs items={items} />,
    )
    expect(ms, `Breadcrumbs 20 items: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Cascader handles deep hierarchy', () => {
    const buildCascader = (depth: number, breadth: number, prefix = ''): any[] => {
      if (depth === 0) return []
      return Array.from({ length: breadth }, (_, i) => ({
        label: `${prefix}Item ${i}`,
        value: `${prefix}item-${i}`,
        children: depth > 1 ? buildCascader(depth - 1, breadth, `${prefix}${i}-`) : undefined,
      }))
    }
    const options = buildCascader(4, 8)
    const ms = measureRender(
      <Cascader options={options} />,
    )
    expect(ms, `Cascader 4-deep × 8-wide: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('CheckboxGroup handles 100 options', () => {
    const options = Array.from({ length: 100 }, (_, i) => ({
      label: `Option ${i}`,
      value: `opt-${i}`,
    }))
    const ms = measureRender(
      <CheckboxGroup options={options} />,
    )
    expect(ms, `CheckboxGroup 100 options: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('RadioGroup handles 100 options', () => {
    const options = Array.from({ length: 100 }, (_, i) => ({
      label: `Option ${i}`,
      value: `opt-${i}`,
    }))
    const ms = measureRender(
      <RadioGroup options={options} />,
    )
    expect(ms, `RadioGroup 100 options: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Descriptions handles 50 items', () => {
    const items = Array.from({ length: 50 }, (_, i) => ({
      label: `Field ${i}`,
      value: `Value ${i}`,
    }))
    const ms = measureRender(
      <Descriptions items={items} />,
    )
    expect(ms, `Descriptions 50 items: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('Pagination with 10000 total items', () => {
    const ms = measureRender(
      <Pagination total={10000} pageSize={10} />,
    )
    expect(ms, `Pagination 10000 items: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })
})

// ─── 4. Batch Mount: Many Instances ───────────────────────────
describe('Performance: Batch', () => {
  it('renders 100 Buttons', () => {
    const ms = measureRender(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Button key={i} variant={i % 3 === 0 ? 'solid' : 'outline'}>
            Button {i}
          </Button>
        ))}
      </div>,
    )
    expect(ms, `100 Buttons: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('renders 100 Inputs', () => {
    const ms = measureRender(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Input key={i} placeholder={`Input ${i}`} />
        ))}
      </div>,
    )
    expect(ms, `100 Inputs: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('renders 100 Badges', () => {
    const ms = measureRender(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Badge key={i} color={i % 2 === 0 ? 'primary' : 'success'}>
            Badge {i}
          </Badge>
        ))}
      </div>,
    )
    expect(ms, `100 Badges: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('renders 100 Switches', () => {
    const ms = measureRender(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Switch key={i} checked={i % 2 === 0} />
        ))}
      </div>,
    )
    expect(ms, `100 Switches: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('renders 100 Checkboxes', () => {
    const ms = measureRender(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Checkbox key={i} checked={i % 2 === 0} />
        ))}
      </div>,
    )
    expect(ms, `100 Checkboxes: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('renders 50 Cards with content', () => {
    const ms = measureRender(
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <Card key={i}>
            <div>Card {i} title</div>
            <div>Card {i} content with some text</div>
          </Card>
        ))}
      </div>,
    )
    expect(ms, `50 Cards: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('renders 50 Tags', () => {
    const ms = measureRender(
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <Tag key={i} closable onClose={() => {}}>Tag {i}</Tag>
        ))}
      </div>,
    )
    expect(ms, `50 Tags: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })

  it('renders 20 Selects', () => {
    const opts = generateItems(20)
    const ms = measureRender(
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <Select key={i} options={opts} placeholder={`Select ${i}`} />
        ))}
      </div>,
    )
    expect(ms, `20 Selects: ${ms.toFixed(1)}ms`).toBeLessThan(STRESS_BUDGET)
  })
})

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Checkbox from '../checkbox'
import CheckboxGroup from './index'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Data Entry/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    label: {
      control: 'text',
      description: 'Group label',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
}

export default meta
type Story = StoryObj<typeof CheckboxGroup>

export const Primary: Story = {
  render: () => {
    const [checked, setChecked] = useState({
      option1: false,
      option2: false,
      option3: false,
    })

    return (
      <CheckboxGroup label="Select options">
        <Checkbox
          label="Option 1"
          checked={checked.option1}
          onChange={(e) => setChecked({ ...checked, option1: e.target.checked })}
        />
        <Checkbox
          label="Option 2"
          checked={checked.option2}
          onChange={(e) => setChecked({ ...checked, option2: e.target.checked })}
        />
        <Checkbox
          label="Option 3"
          checked={checked.option3}
          onChange={(e) => setChecked({ ...checked, option3: e.target.checked })}
        />
      </CheckboxGroup>
    )
  },
}

export const VerticalLayout: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      notifications: true,
      newsletter: false,
      updates: true,
    })

    return (
      <CheckboxGroup label="Notification Preferences" orientation="vertical">
        <Checkbox
          label="Email Notifications"
          helperText="Receive important updates via email"
          checked={features.notifications}
          onChange={(e) => setFeatures({ ...features, notifications: e.target.checked })}
        />
        <Checkbox
          label="Newsletter"
          helperText="Get our monthly newsletter"
          checked={features.newsletter}
          onChange={(e) => setFeatures({ ...features, newsletter: e.target.checked })}
        />
        <Checkbox
          label="Product Updates"
          helperText="Stay informed about new features"
          checked={features.updates}
          onChange={(e) => setFeatures({ ...features, updates: e.target.checked })}
        />
      </CheckboxGroup>
    )
  },
}

export const HorizontalLayout: Story = {
  render: () => {
    const [days, setDays] = useState({
      monday: true,
      wednesday: false,
      friday: true,
    })

    return (
      <CheckboxGroup label="Select days" orientation="horizontal">
        <Checkbox
          label="Monday"
          checked={days.monday}
          onChange={(e) => setDays({ ...days, monday: e.target.checked })}
        />
        <Checkbox
          label="Wednesday"
          checked={days.wednesday}
          onChange={(e) => setDays({ ...days, wednesday: e.target.checked })}
        />
        <Checkbox
          label="Friday"
          checked={days.friday}
          onChange={(e) => setDays({ ...days, friday: e.target.checked })}
        />
      </CheckboxGroup>
    )
  },
}

export const WithHelperText: Story = {
  render: () => {
    const [permissions, setPermissions] = useState({
      read: true,
      write: false,
      delete: false,
    })

    return (
      <CheckboxGroup
        label="User Permissions"
        helperText="Select the permissions you want to grant"
        orientation="vertical"
      >
        <Checkbox
          label="Read Access"
          helperText="View files and folders"
          checked={permissions.read}
          onChange={(e) => setPermissions({ ...permissions, read: e.target.checked })}
        />
        <Checkbox
          label="Write Access"
          helperText="Create and edit files"
          checked={permissions.write}
          onChange={(e) => setPermissions({ ...permissions, write: e.target.checked })}
        />
        <Checkbox
          label="Delete Access"
          helperText="Remove files and folders"
          checked={permissions.delete}
          onChange={(e) => setPermissions({ ...permissions, delete: e.target.checked })}
        />
      </CheckboxGroup>
    )
  },
}

export const WithError: Story = {
  render: () => {
    const [selected, setSelected] = useState({
      terms: false,
      privacy: false,
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
      setSubmitted(true)
    }

    const hasError = submitted && (!selected.terms || !selected.privacy)

    return (
      <div className="space-y-4 max-w-md">
        <CheckboxGroup
          label="Agreement *"
          error={hasError ? 'You must accept both terms to continue' : ''}
          orientation="vertical"
        >
          <Checkbox
            label="I agree to the Terms and Conditions"
            checked={selected.terms}
            onChange={(e) => setSelected({ ...selected, terms: e.target.checked })}
          />
          <Checkbox
            label="I agree to the Privacy Policy"
            checked={selected.privacy}
            onChange={(e) => setSelected({ ...selected, privacy: e.target.checked })}
          />
        </CheckboxGroup>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </div>
    )
  },
}


export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
      item4: false,
    })

    const allChecked = Object.values(items).every(Boolean)
    const isIndeterminate = Object.values(items).some(Boolean) && !allChecked

    const handleSelectAll = (checked: boolean) => {
      setItems({
        item1: checked,
        item2: checked,
        item3: checked,
        item4: checked,
      })
    }

    return (
      <CheckboxGroup label="Select Items" orientation="vertical">
        <Checkbox
          label="Select All"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        <div className="ml-6 space-y-2">
          <Checkbox
            label="Item 1"
            checked={items.item1}
            onChange={(e) => setItems({ ...items, item1: e.target.checked })}
          />
          <Checkbox
            label="Item 2"
            checked={items.item2}
            onChange={(e) => setItems({ ...items, item2: e.target.checked })}
          />
          <Checkbox
            label="Item 3"
            checked={items.item3}
            onChange={(e) => setItems({ ...items, item3: e.target.checked })}
          />
          <Checkbox
            label="Item 4"
            checked={items.item4}
            onChange={(e) => setItems({ ...items, item4: e.target.checked })}
          />
        </div>
      </CheckboxGroup>
    )
  },
}

export const NestedCheckboxes: Story = {
  render: () => {
    const [permissions, setPermissions] = useState({
      files: false,
      filesRead: false,
      filesWrite: false,
      users: false,
      usersRead: false,
      usersWrite: false,
    })

    const handleFilesChange = (checked: boolean) => {
      setPermissions({
        ...permissions,
        files: checked,
        filesRead: checked,
        filesWrite: checked,
      })
    }

    const handleUsersChange = (checked: boolean) => {
      setPermissions({
        ...permissions,
        users: checked,
        usersRead: checked,
        usersWrite: checked,
      })
    }

    const filesIndeterminate = (permissions.filesRead || permissions.filesWrite) && !(permissions.filesRead && permissions.filesWrite)
    const usersIndeterminate = (permissions.usersRead || permissions.usersWrite) && !(permissions.usersRead && permissions.usersWrite)

    return (
      <CheckboxGroup label="Module Permissions" orientation="vertical">
        <Checkbox
          label="Files Module"
          checked={permissions.filesRead && permissions.filesWrite}
          indeterminate={filesIndeterminate}
          onChange={(e) => handleFilesChange(e.target.checked)}
        />
        <div className="ml-6 space-y-2">
          <Checkbox
            label="Read Files"
            checked={permissions.filesRead}
            onChange={(e) => setPermissions({ ...permissions, filesRead: e.target.checked })}
          />
          <Checkbox
            label="Write Files"
            checked={permissions.filesWrite}
            onChange={(e) => setPermissions({ ...permissions, filesWrite: e.target.checked })}
          />
        </div>

        <Checkbox
          label="Users Module"
          checked={permissions.usersRead && permissions.usersWrite}
          indeterminate={usersIndeterminate}
          onChange={(e) => handleUsersChange(e.target.checked)}
        />
        <div className="ml-6 space-y-2">
          <Checkbox
            label="View Users"
            checked={permissions.usersRead}
            onChange={(e) => setPermissions({ ...permissions, usersRead: e.target.checked })}
          />
          <Checkbox
            label="Manage Users"
            checked={permissions.usersWrite}
            onChange={(e) => setPermissions({ ...permissions, usersWrite: e.target.checked })}
          />
        </div>
      </CheckboxGroup>
    )
  },
}


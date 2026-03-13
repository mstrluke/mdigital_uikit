import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { AlertCircle, CheckCircle, FileText, Info, Layers, Settings, Trash2, User } from 'lucide-react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
  ModalClose,
} from './index'
import ComposedModal from './index'
import Button from '../button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  ComposedDrawer,
} from '../drawer'

const meta: Meta<typeof ComposedModal> = {
  title: 'Feedback/Modal',
  component: ComposedModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Modal size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Border color accent',
    },
    centered: {
      control: 'boolean',
      description: 'Center align content',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
}

export default meta
type Story = StoryObj<typeof ComposedModal>

// Basic example with default settings
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <ComposedModal
          open={open}
          onOpenChange={setOpen}
          title="Modal Title"
          description="This is a description that provides additional context about the modal."
        >
          <div className="py-4">
            <p className="text-sm text-text-secondary">
              This is the modal content. You can put any content here.
            </p>
          </div>
        </ComposedModal>
      </>
    )
  },
}

// Confirmation dialog example
export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    const handleConfirm = () => {
      console.log('Confirmed!')
      setOpen(false)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)} color="error">Delete Account</Button>
        <ComposedModal
          open={open}
          onOpenChange={setOpen}
          color="error"
          title="Delete Account"
          description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          footer={
            <>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button color="error" onClick={handleConfirm} leftIcon={<Trash2 />}>
                Delete Account
              </Button>
            </>
          }
        />
      </>
    )
  },
}

// Alert dialog example
export const AlertDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)} color="warning">Show Alert</Button>
        <ComposedModal
          open={open}
          onOpenChange={setOpen}
          size="sm"
          color="warning"
          centered
          title="Warning"
          description="Your session is about to expire in 2 minutes."
          footer={
            <Button onClick={() => setOpen(false)} color="warning" fullWidth>
              Extend Session
            </Button>
          }
        />
      </>
    )
  },
}

// Success notification modal
export const SuccessNotification: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)} color="success">Complete Action</Button>
        <ComposedModal
          open={open}
          onOpenChange={setOpen}
          size="sm"
          color="success"
          centered
          title="Success!"
          description="Your changes have been saved successfully."
          footer={
            <Button onClick={() => setOpen(false)} color="success" fullWidth leftIcon={<CheckCircle />}>
              Continue
            </Button>
          }
        />
      </>
    )
  },
}

// Form modal example
export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '' })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted:', formData)
      setOpen(false)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)} leftIcon={<User />}>Edit Profile</Button>
        <ComposedModal
          open={open}
          onOpenChange={setOpen}
          size="md"
          color="primary"
          title="Edit Profile"
          description="Update your personal information."
          footer={
            <>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button color="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </>
          }
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>
          </form>
        </ComposedModal>
      </>
    )
  },
}

// Information modal with icon
export const InfoModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)} color="info" leftIcon={<Info />}>
          Learn More
        </Button>
        <ComposedModal
          open={open}
          onOpenChange={setOpen}
          color="info"
          title="How It Works"
          description="Learn about the key features and benefits."
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-info/20 flex items-center justify-center text-info font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">Sign Up</h4>
                <p className="text-sm text-text-secondary">Create your account in seconds.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-info/20 flex items-center justify-center text-info font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">Configure</h4>
                <p className="text-sm text-text-secondary">Set up your preferences and settings.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-info/20 flex items-center justify-center text-info font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">Start Using</h4>
                <p className="text-sm text-text-secondary">Begin using all features immediately.</p>
              </div>
            </div>
          </div>
        </ComposedModal>
      </>
    )
  },
}

// Custom composition example
export const CustomComposition: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Custom Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent size="lg" color="accent">
            <ModalHeader size="lg" color="accent">
              <ModalTitle size="lg">Custom Composed Modal</ModalTitle>
              <ModalDescription size="lg">
                Build your own modal structure using the primitive components.
              </ModalDescription>
            </ModalHeader>

            <div className="py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface rounded-lg">
                  <h4 className="font-semibold mb-2">Feature 1</h4>
                  <p className="text-sm text-text-secondary">Description of feature 1.</p>
                </div>
                <div className="p-4 bg-surface rounded-lg">
                  <h4 className="font-semibold mb-2">Feature 2</h4>
                  <p className="text-sm text-text-secondary">Description of feature 2.</p>
                </div>
              </div>
            </div>

            <ModalFooter size="lg">
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button color="accent">Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  },
}

// Modal with trigger
export const WithTrigger: Story = {
  render: () => {
    return (
      <Modal>
        <ModalTrigger asChild>
          <Button>Open with Trigger</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal with Trigger</ModalTitle>
            <ModalDescription>
              This modal uses a ModalTrigger component instead of controlled state.
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p className="text-sm text-text-secondary">
              The trigger automatically handles opening and closing the modal.
            </p>
          </div>
          <ModalFooter>
            <ModalClose asChild>
              <Button>Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  },
}

// Stacked modals — nested modals opening on top of each other
export const StackedModals: Story = {
  render: () => {
    const [level1, setLevel1] = useState(false)
    const [level2, setLevel2] = useState(false)
    const [level3, setLevel3] = useState(false)

    return (
      <>
        <Button onClick={() => setLevel1(true)}>Open First Modal</Button>

        {/* Level 1 */}
        <ComposedModal
          open={level1}
          onOpenChange={setLevel1}
          size="lg"
          title="Level 1 — Main Modal"
          description="This is the first modal in the stack. Open another on top of this one."
          footer={
            <>
              <Button variant="outline" onClick={() => setLevel1(false)}>Close</Button>
              <Button color="primary" onClick={() => setLevel2(true)}>
                Open Level 2
              </Button>
            </>
          }
        >
          <div className="py-4 space-y-3">
            <p className="text-sm text-text-secondary">
              Click "Open Level 2" to stack another modal on top. You can click outside or press Escape to close the topmost modal without affecting modals below it.
            </p>
            <div className="p-3 bg-surface rounded-lg border border-border">
              <p className="text-xs font-mono text-text-secondary">Stack depth: 1</p>
            </div>
          </div>
        </ComposedModal>

        {/* Level 2 */}
        <ComposedModal
          open={level2}
          onOpenChange={setLevel2}
          size="md"
          color="primary"
          title="Level 2 — Nested Modal"
          description="Stacked on top of Level 1. Open one more?"
          footer={
            <>
              <Button variant="outline" onClick={() => setLevel2(false)}>Back</Button>
              <Button color="warning" onClick={() => setLevel3(true)}>
                Open Level 3
              </Button>
            </>
          }
        >
          <div className="py-4 space-y-3">
            <p className="text-sm text-text-secondary">
              Notice the overlay dims further with each level. Each modal is independently dismissible.
            </p>
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs font-mono text-primary">Stack depth: 2</p>
            </div>
          </div>
        </ComposedModal>

        {/* Level 3 */}
        <ComposedModal
          open={level3}
          onOpenChange={setLevel3}
          size="sm"
          color="warning"
          centered
          title="Level 3 — Confirmation"
          description="Are you sure you want to proceed? This is the deepest level."
          footer={
            <>
              <Button variant="outline" onClick={() => setLevel3(false)}>Cancel</Button>
              <Button
                color="success"
                onClick={() => {
                  setLevel3(false)
                  setLevel2(false)
                  setLevel1(false)
                }}
              >
                Confirm & Close All
              </Button>
            </>
          }
        >
          <div className="py-2">
            <div className="p-3 bg-warning/5 rounded-lg border border-warning/20">
              <p className="text-xs font-mono text-warning">Stack depth: 3</p>
            </div>
          </div>
        </ComposedModal>
      </>
    )
  },
}

// Stacked modal with different types (modal + confirmation)
export const ModalWithConfirmation: Story = {
  render: () => {
    const [formOpen, setFormOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [dirty, setDirty] = useState(false)

    const handleClose = () => {
      if (dirty) {
        setConfirmOpen(true)
      } else {
        setFormOpen(false)
      }
    }

    const handleDiscard = () => {
      setConfirmOpen(false)
      setFormOpen(false)
      setDirty(false)
    }

    return (
      <>
        <Button onClick={() => { setFormOpen(true); setDirty(false) }} leftIcon={<User />}>
          Edit Profile
        </Button>

        <ComposedModal
          open={formOpen}
          onOpenChange={(open) => { if (!open) handleClose(); else setFormOpen(true) }}
          size="md"
          color="primary"
          title="Edit Profile"
          description="Make changes to your profile. Unsaved changes will prompt a confirmation."
          showCloseButton={false}
          footer={
            <>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button color="primary" onClick={() => { setFormOpen(false); setDirty(false) }}>
                Save Changes
              </Button>
            </>
          }
        >
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Display Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter name"
                onChange={() => setDirty(true)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Bio</label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
                placeholder="Tell us about yourself"
                onChange={() => setDirty(true)}
              />
            </div>
            {dirty && (
              <p className="text-xs text-warning flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> You have unsaved changes
              </p>
            )}
          </div>
        </ComposedModal>

        {/* Discard confirmation */}
        <ComposedModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          size="xs"
          color="error"
          centered
          title="Discard changes?"
          description="You have unsaved changes that will be lost."
          footer={
            <>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Keep Editing</Button>
              <Button color="error" onClick={handleDiscard} leftIcon={<Trash2 className="w-4 h-4" />}>
                Discard
              </Button>
            </>
          }
        />
      </>
    )
  },
}

// Modal opens inside a Drawer
export const ModalInDrawer: Story = {
  render: () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const items = [
      { id: 1, name: 'Project Alpha', status: 'Active', updated: '2 hours ago' },
      { id: 2, name: 'Project Beta', status: 'Draft', updated: '1 day ago' },
      { id: 3, name: 'Project Gamma', status: 'Archived', updated: '3 days ago' },
    ]
    const [selected, setSelected] = useState(items[0])

    return (
      <>
        <Button onClick={() => setDrawerOpen(true)} leftIcon={<Layers className="w-4 h-4" />}>
          Open Project Panel
        </Button>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
          <DrawerContent direction="right" size="lg" showCloseButton>
            <DrawerHeader>
              <DrawerTitle>Projects</DrawerTitle>
              <DrawerDescription>Manage your projects. Click a project to view details.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors"
                    onClick={() => { setSelected(item); setModalOpen(true) }}
                  >
                    <div>
                      <p className="font-medium text-text-primary">{item.name}</p>
                      <p className="text-xs text-text-secondary">Updated {item.updated}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.status === 'Active' ? 'bg-success/10 text-success' :
                      item.status === 'Draft' ? 'bg-warning/10 text-warning' :
                      'bg-surface text-text-secondary'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" fullWidth>Close Panel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Modal opens on top of drawer */}
        <ComposedModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          size="md"
          color="primary"
          title={selected.name}
          description={`Status: ${selected.status} · Last updated ${selected.updated}`}
          footer={
            <>
              <Button
                variant="outline"
                color="error"
                onClick={() => setDeleteOpen(true)}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Delete
              </Button>
              <div className="flex-1" />
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button color="primary" onClick={() => setModalOpen(false)}>Save</Button>
            </>
          }
        >
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Project Name</label>
              <input
                type="text"
                defaultValue={selected.name}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
                placeholder="Project description..."
              />
            </div>
          </div>
        </ComposedModal>

        {/* Delete confirmation stacks on top of the edit modal */}
        <ComposedModal
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          size="xs"
          color="error"
          centered
          title="Delete project?"
          description={`"${selected.name}" will be permanently removed.`}
          footer={
            <>
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
              <Button
                color="error"
                onClick={() => { setDeleteOpen(false); setModalOpen(false) }}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Delete
              </Button>
            </>
          }
        />
      </>
    )
  },
}

// Drawer opens inside a Modal
export const DrawerInModal: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const logs = [
      { time: '14:32:01', level: 'info', message: 'Application started' },
      { time: '14:32:02', level: 'info', message: 'Connected to database' },
      { time: '14:32:03', level: 'warning', message: 'Cache miss for key: user_prefs' },
      { time: '14:32:04', level: 'info', message: 'Loaded 42 records from users table' },
      { time: '14:32:05', level: 'error', message: 'Failed to connect to external API' },
      { time: '14:32:06', level: 'info', message: 'Retry attempt 1/3...' },
      { time: '14:32:08', level: 'info', message: 'External API connected' },
      { time: '14:32:09', level: 'info', message: 'All services healthy' },
    ]

    return (
      <>
        <Button onClick={() => setModalOpen(true)} leftIcon={<Settings className="w-4 h-4" />}>
          System Dashboard
        </Button>

        <ComposedModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          size="lg"
          title="System Dashboard"
          description="Monitor system health and view detailed logs."
        >
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'CPU', value: '23%', color: 'text-success' },
                { label: 'Memory', value: '67%', color: 'text-warning' },
                { label: 'Disk', value: '45%', color: 'text-info' },
              ].map((stat) => (
                <div key={stat.label} className="p-3 bg-surface rounded-lg text-center">
                  <p className="text-xs text-text-secondary">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-text-secondary">Recent activity (last 3)</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDrawerOpen(true)}
                leftIcon={<FileText className="w-3.5 h-3.5" />}
              >
                View Full Logs
              </Button>
            </div>

            <div className="space-y-1">
              {logs.slice(-3).map((log, i) => (
                <div key={i} className="flex gap-2 text-xs font-mono px-2 py-1 rounded bg-surface">
                  <span className="text-text-secondary shrink-0">{log.time}</span>
                  <span className={
                    log.level === 'error' ? 'text-error shrink-0' :
                    log.level === 'warning' ? 'text-warning shrink-0' :
                    'text-info shrink-0'
                  }>
                    [{log.level}]
                  </span>
                  <span className="text-text-primary truncate">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </ComposedModal>

        {/* Full log drawer slides out from the modal */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
          <DrawerContent direction="right" size="lg" showCloseButton>
            <DrawerHeader>
              <DrawerTitle>System Logs</DrawerTitle>
              <DrawerDescription>Complete log output from current session.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-3 text-sm font-mono px-3 py-2 rounded hover:bg-surface transition-colors">
                    <span className="text-text-secondary shrink-0 tabular-nums">{log.time}</span>
                    <span className={`shrink-0 w-16 text-right ${
                      log.level === 'error' ? 'text-error font-semibold' :
                      log.level === 'warning' ? 'text-warning' :
                      'text-text-secondary'
                    }`}>
                      {log.level}
                    </span>
                    <span className="text-text-primary">{log.message}</span>
                  </div>
                ))}
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onClick={() => setDrawerOpen(false)}>Close</Button>
              <Button color="info" variant="outline" leftIcon={<FileText className="w-4 h-4" />}>
                Export Logs
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  },
}


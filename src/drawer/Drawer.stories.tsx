import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Menu,
  Settings,
  ShoppingCart,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  X,
  Bell,
  CreditCard,
  LogOut,
  HelpCircle,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerBody,
  DrawerTrigger,
  DrawerClose,
} from "./index";
import ComposedDrawer from "./index";
import Button from "../button";

const meta: Meta<typeof Drawer> = {
  title: "Feedback/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["bottom", "top", "left", "right"],
      description: "Drawer position",
    },
    modal: {
      control: "boolean",
      description: "Whether to render as a modal",
    },
    dismissible: {
      control: "boolean",
      description: "Whether drawer can be dismissed by dragging",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Basic Examples

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>
                This is a description that provides additional context.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-text-secondary">
                This is the drawer content. Swipe down or click outside to
                close.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

export const AllPositions: Story = {
  render: () => {
    const [openBottom, setOpenBottom] = useState(false);
    const [openTop, setOpenTop] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);

    return (
      <div className="flex gap-4 flex-wrap">
        <Button onClick={() => setOpenBottom(true)}>Bottom</Button>
        <Button onClick={() => setOpenTop(true)}>Top</Button>
        <Button onClick={() => setOpenLeft(true)}>Left</Button>
        <Button onClick={() => setOpenRight(true)}>Right</Button>

        <Drawer
          open={openBottom}
          onOpenChange={setOpenBottom}
          direction="bottom"
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Bottom Drawer</DrawerTitle>
              <DrawerDescription>
                Slides up from the bottom of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-text-secondary">Content goes here.</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Drawer open={openTop} onOpenChange={setOpenTop} direction="top">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Top Drawer</DrawerTitle>
              <DrawerDescription>
                Slides down from the top of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-text-secondary">Content goes here.</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Drawer open={openLeft} onOpenChange={setOpenLeft} direction="left">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Left Drawer</DrawerTitle>
              <DrawerDescription>
                Slides in from the left side.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-text-secondary">
                Perfect for navigation menus.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Drawer open={openRight} onOpenChange={setOpenRight} direction="right">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Right Drawer</DrawerTitle>
              <DrawerDescription>
                Slides in from the right side.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-text-secondary">
                Great for settings or filters.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
};

// Close Button & Handle

export const WithCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open with Close Button</Button>
        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerContent showCloseButton>
            <DrawerHeader>
              <DrawerTitle>Drawer with Close Button</DrawerTitle>
              <DrawerDescription>
                Click the X button in the corner to close
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-text-secondary">
                The close button provides an explicit way to dismiss the drawer.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

// Real-World Examples

export const NavigationMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const menuItems = [
      { icon: <User className="size-5" />, label: "Profile", href: "#" },
      { icon: <Settings className="size-5" />, label: "Settings", href: "#" },
      { icon: <Bell className="size-5" />, label: "Notifications", href: "#" },
      { icon: <CreditCard className="size-5" />, label: "Billing", href: "#" },
      { icon: <HelpCircle className="size-5" />, label: "Help", href: "#" },
    ];

    return (
      <>
        <Button onClick={() => setOpen(true)} leftIcon={<Menu />}>
          Menu
        </Button>
        <Drawer open={open} onOpenChange={setOpen} direction="left">
          <DrawerContent size="sm" showCloseButton>
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>
                Access your account and settings
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface rounded-lg transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<LogOut className="size-4" />}
                onClick={() => setOpen(false)}
              >
                Sign Out
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

export const ShoppingCartDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const cartItems = [
      { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
      { id: 2, name: "Product 2", price: 49.99, quantity: 1 },
      { id: 3, name: "Product 3", price: 19.99, quantity: 3 },
    ];

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return (
      <>
        <Button onClick={() => setOpen(true)} leftIcon={<ShoppingCart />}>
          Cart ({cartItems.length})
        </Button>
        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerContent size="md" showCloseButton>
            <DrawerHeader>
              <DrawerTitle>Shopping Cart</DrawerTitle>
              <DrawerDescription>
                {cartItems.length} items in your cart
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start p-3 bg-surface rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">
                        {item.name}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button className="text-xs text-error hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </DrawerBody>
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-text-primary">
                  Total:
                </span>
                <span className="text-2xl font-bold text-text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
              <DrawerFooter className="p-0">
                <Button color="primary" fullWidth>
                  Checkout
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" fullWidth>
                    Continue Shopping
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

export const FiltersDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
      priceRange: [0, 100],
      categories: [] as string[],
      inStock: true,
    });

    return (
      <>
        <Button onClick={() => setOpen(true)} leftIcon={<Filter />}>
          Filters
        </Button>
        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerContent size="sm" showCloseButton>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Refine your search results</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: [0, Number(e.target.value)],
                        })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>$0</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {["Electronics", "Clothing", "Books", "Home"].map(
                      (category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.categories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters({
                                  ...filters,
                                  categories: [...filters.categories, category],
                                });
                              } else {
                                setFilters({
                                  ...filters,
                                  categories: filters.categories.filter(
                                    (c) => c !== category,
                                  ),
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm text-text-primary">
                            {category}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) =>
                        setFilters({ ...filters, inStock: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-text-primary">
                      In Stock Only
                    </span>
                  </label>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button color="primary" fullWidth onClick={() => setOpen(false)}>
                Apply Filters
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() =>
                  setFilters({
                    priceRange: [0, 100],
                    categories: [],
                    inStock: true,
                  })
                }
              >
                Clear All
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

export const UserProfileDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const userInfo = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    };

    return (
      <>
        <Button onClick={() => setOpen(true)} leftIcon={<User />}>
          View Profile
        </Button>
        <ComposedDrawer
          open={open}
          onOpenChange={setOpen}
          title="User Profile"
          description="View and manage your information"
          direction="right"
          size="md"
          footer={
            <>
              <Button color="primary" fullWidth>
                Edit Profile
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </>
          }
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                {userInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  {userInfo.name}
                </h3>
                <p className="text-sm text-text-secondary">Premium Member</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <Mail className="text-text-secondary" />
                <div>
                  <p className="text-xs text-text-secondary">Email</p>
                  <p className="text-sm text-text-primary">{userInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <Phone className="text-text-secondary" />
                <div>
                  <p className="text-xs text-text-secondary">Phone</p>
                  <p className="text-sm text-text-primary">{userInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <MapPin className="text-text-secondary" />
                <div>
                  <p className="text-xs text-text-secondary">Location</p>
                  <p className="text-sm text-text-primary">
                    {userInfo.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ComposedDrawer>
      </>
    );
  },
};

// Configuration Examples

export const WithTrigger: Story = {
  render: () => {
    return (
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button leftIcon={<Settings />}>Open Settings</Button>
        </DrawerTrigger>
        <DrawerContent size="sm" showCloseButton>
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>
              Manage your application settings
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-text-primary mb-2">
                  Appearance
                </h4>
                <div className="space-y-2">
                  {["Light", "Dark", "System"].map((theme) => (
                    <label
                      key={theme}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="theme"
                        value={theme.toLowerCase()}
                        defaultChecked={theme === "System"}
                        className="rounded"
                      />
                      <span className="text-sm text-text-primary">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button color="primary" fullWidth>
                Save Changes
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const BottomSheetForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ message: "" });

    return (
      <>
        <Button onClick={() => setOpen(true)}>Add Comment</Button>
        <Drawer open={open} onOpenChange={setOpen} direction="bottom">
          <DrawerContent size="md">
            <DrawerHeader>
              <DrawerTitle>Add a Comment</DrawerTitle>
              <DrawerDescription>
                Share your thoughts with the community
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ message: e.target.value })}
                placeholder="Write your comment..."
                className="w-full min-h-32 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </DrawerBody>
            <DrawerFooter>
              <Button
                color="primary"
                fullWidth
                disabled={!formData.message.trim()}
              >
                Post Comment
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" fullWidth>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

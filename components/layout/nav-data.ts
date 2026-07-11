export const navItems = [
  { index: "01", label: "Home", href: "/" },
  { index: "02", label: "Experience", href: "/experience" },
  {
    index: "03",
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Digital Systems Lab", href: "/projects/systems" },
      { label: "Media Gallery", href: "/projects/media" },
    ],
  },
  { index: "04", label: "About", href: "/about" },
  { index: "05", label: "Blog", href: "/blog" },
  { index: "06", label: "Contact", href: "/contact" },
];

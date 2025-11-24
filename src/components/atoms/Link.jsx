function Link({ href, label, children, ...props }) {
  return (
    <a className="" href={href} aria-label={label} {...props}>
        {children}
    </a>
  )
}

export default Link;
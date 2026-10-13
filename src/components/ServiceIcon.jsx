const ServiceIcon = ({ type, color }) => {
  const icons = {
    portrait: <><path d="M8 15h7l3-4h12l3 4h7a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V18a3 3 0 0 1 3-3Z" /><circle cx="24" cy="26" r="8" /><circle cx="37" cy="20" r="1" fill={color} /></>,
    wedding: <><circle cx="19" cy="27" r="10" /><circle cx="29" cy="27" r="10" /><path d="m24 8 1.5 3.5L29 13l-3.5 1.5L24 18l-1.5-3.5L19 13l3.5-1.5L24 8Z" /></>,
    event: <><path d="m8 38 22-22 7 7-22 22-9 2 2-9Z" /><path d="m27 19 7 7M8 8l2 4m8-7v5m18 3 4-2m-3 14 5 1" /><path d="m8 8 2 4m0-4-2 4" /></>,
    fashion: <><path d="M24 12a4 4 0 1 0-4-4" /><path d="m20 12-13 9a2 2 0 0 0 1 4h32a2 2 0 0 0 1-4l-13-9" /><path d="M13 31h22l4 11H9l4-11Z" /></>,
    landscape: <><circle cx="35" cy="12" r="5" /><path d="m5 38 13-17 8 10 5-6 12 13H5Z" /><path d="m14 38 8-10 6 7" /></>,
    commercial: <><rect x="6" y="15" width="36" height="27" rx="3" /><path d="M17 15v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M6 25h36M20 25v4h8v-4" /></>
  }

  return (
    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[type]}
    </svg>
  )
}

export default ServiceIcon

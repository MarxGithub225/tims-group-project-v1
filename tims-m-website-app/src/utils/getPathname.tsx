import React from 'react'

export default function getPathname(fullAdress?: boolean): string {
  let pathname: string
  if (typeof window === 'undefined') {
    pathname = global.location.pathname
  } else {
    pathname = window.location.pathname
  }
  if (pathname === '/') {
    pathname = 'dashboard'
  } else {
    pathname = pathname.split('/')[1].replace(/^\/|\/$/g, '')
  }

 return !fullAdress ? pathname : window.location.pathname
}

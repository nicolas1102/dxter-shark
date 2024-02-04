import React from 'react'

interface InfoProductItemProps {
  props: {
    title: string
    data: string
  }
}

const InfoProductItem = ({ props }: InfoProductItemProps) => {
  const { title, data } = props
  return (
    <li className='mt-10'>
      <p className='text-base font-extralight'>
        <span className='font-medium'>{title.toUpperCase()}: </span>
        {data}
      </p>
    </li>
  )
}

export default InfoProductItem

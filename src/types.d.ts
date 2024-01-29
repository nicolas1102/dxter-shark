export interface ImageInterface {
  imageSrc: string
  alt: string
}

export interface Featured {
  title: string
  href: string
}

export interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface VerifyEmailProps {
  token: string
}
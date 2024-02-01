export interface ImageInterface {
  imageSrc: string
  alt: string
}

export interface Featured {
  title: string
  value: string
  href: string
}

export interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface VerifyEmailProps {
  token: string
}

export interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
  query: TQueryValidator
}
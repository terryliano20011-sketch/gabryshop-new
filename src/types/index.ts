export interface Product {
  id: string
  name: string
  slug: string
  description: string
  long_description: string
  price: number
  original_price?: number
  category_id: string
  category?: Category
  file_url?: string
  preview_url?: string
  delivery_time: string
  is_customizable: boolean
  is_bestseller: boolean
  is_digital: boolean
  badge?: 'bestseller' | 'new' | 'customizable' | '24h'
  includes: string[]
  images: string[]
  rating: number
  review_count: number
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  product_count: number
  image?: string
}

export interface Order {
  id: string
  user_id?: string
  customer_name: string
  customer_email: string
  customer_vat?: string
  products: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'completed' | 'refunded'
  paypal_order_id?: string
  coupon_code?: string
  discount_amount: number
  briefing?: Record<string, string>
  created_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  price: number
  quantity: number
  file_url?: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  order_id: string
  rating: number
  comment: string
  author_name: string
  verified_purchase: boolean
  created_at: string
}

export interface Download {
  id: string
  order_id: string
  product_id: string
  user_email: string
  file_url: string
  download_count: number
  expires_at: string
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
  briefing?: Record<string, string>
}

export interface CheckoutData {
  customer_name: string
  customer_email: string
  customer_vat?: string
  coupon_code?: string
}

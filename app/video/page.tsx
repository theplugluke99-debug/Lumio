import type { Metadata } from 'next'
import VideoPlayer from './VideoPlayer'

export const metadata: Metadata = {
  title: 'Lumio — Your clinic. Running itself.',
  description: 'See what Lumio does for aesthetic clinics in 60 seconds.',
}

export default function VideoPage() {
  return <VideoPlayer />
}

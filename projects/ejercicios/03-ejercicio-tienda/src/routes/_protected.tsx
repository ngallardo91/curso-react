import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '../store/authStore'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    const isAuthorized = useAuthStore.getState().isAuthenticated;

    if (!isAuthorized) {
      context.openLogin();

      return {
        redirect: null 
      }
    }
  }
})

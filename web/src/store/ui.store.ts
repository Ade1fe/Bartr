import { create } from 'zustand'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}

interface UIStore {
  // Sidabar
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  // Modal
  activeModal: string | null
  openModal: (modalId: string) => void
  closeModal: () => void

  // Toast notifications
  toastQueue: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}


export const useUIStore = create<UIStore>((set) => ({
  // Sidebar
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Modal
  activeModal: null,
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),

  // Toast
  toastQueue: [],
  addToast: (toast) => set((state) => ({
    toastQueue: [
      ...state.toastQueue,
      { ...toast, id: crypto.randomUUID() }
    ]
  })),
  removeToast: (id) => set((state) => ({
    toastQueue: state.toastQueue.filter((t) => t.id !== id)
  }))
}))
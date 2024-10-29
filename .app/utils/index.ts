export const convertIcon = (data: string) => {
  try {
    switch (data) {
      case '/assets/img/trip.png':
        return 'solar:earth-bold-duotone'
      case '/assets/img/sport.png':
        return 'solar:volleyball-bold-duotone'
      case '/assets/img/fun.png':
        return 'solar:confetti-minimalistic-bold-duotone'
      case '/assets/img/clothes.png':
        return 'solar:hanger-2-bold-duotone'
      case '/assets/img/ajil.png':
        return 'solar:atom-bold-duotone'
      case '/assets/img/shopicon.png':
        return 'solar:bag-4-bold-duotone'
      case '/assets/img/health.png':
        return 'solar:adhesive-plaster-bold-duotone'
      case '/assets/img/culture.png':
        return 'solar:moon-stars-bold-duotone'
      case '/assets/img/resturant.png':
        return 'solar:chef-hat-bold-duotone'
      case '/assets/img/public.png':
        return 'solar:city-bold-duotone'
      default:
        return 'solar:widget-6-line-duotone'
    }
  }
  catch (e) {
    return 'solar:widget-6-line-duotone'
  }
}

// This is a workaround as vite failes to resolves the environment variables
export const variables = {
  collabRooms: import.meta.env.VITE_COLLAB_ROOMS,
}

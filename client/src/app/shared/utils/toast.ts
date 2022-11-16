import { TYPE_ALERT } from '@app/enums'
import Swal from 'sweetalert2'

export const basicAlert = (
  icon: TYPE_ALERT = TYPE_ALERT.SUCCESS,
  title: string = ''
): void => {
  Swal.fire({
    title,
    icon,
    position: 'top',
    showConfirmButton: false,
    toast: true,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast: HTMLElement): void => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};
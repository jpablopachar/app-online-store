import { TYPE_ALERT } from '@app/enums'
import Swal, { SweetAlertResult } from 'sweetalert2'
import { EMAIL_PATTERN } from './regex'

const swalWithBasicOptions = (title: string, html: string) =>
  Swal.mixin({
    title,
    html,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
  });

export const formBasicDialog = async (
  title: string,
  html: string,
  property: string
): Promise<SweetAlertResult<string | undefined>> => {
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: (): string | undefined => {
      const value: string = (
        document.getElementById(property) as HTMLInputElement
      ).value;

      if (value) return value;

      Swal.showValidationMessage(
        'Tines que añadir un género para poder almacenarlo'
      );

      return;
    },
  });
};

export const userFormBasicDialog = async (title: string, html: string) => {
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {
      let error: string = '';

      const name: string = (document.getElementById('name') as HTMLInputElement)
        .value;

      if (!name) error += 'Usuario es obligatorio<br/>';

      const lastName: string = (
        document.getElementById('lastName') as HTMLInputElement
      ).value;

      if (!lastName) error += 'Apellido es obligatorio<br/>';

      const email: string = (
        document.getElementById('email') as HTMLInputElement
      ).value;

      if (!email) error += 'Email es obligatorio<br/>';

      if (!EMAIL_PATTERN.test(email)) error += 'Email es inválido';

      const role: string = (document.getElementById('role') as HTMLInputElement)
        .value;

      if (error !== '') {
        Swal.showValidationMessage(error);

        return;
      }

      return {
        name,
        lastName,
        email,
        role,
        birthday: new Date().toISOString(),
      };
    },
  });
};

export const optionsWithDetails = async (
  title: string,
  html: string,
  width: number | string,
  confirmButtonText: string = '',
  cancelButtonText: string = ''
): Promise<boolean | undefined> => {
  return await Swal.fire({
    title,
    html,
    width: `${width}px`,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#6c757d',
    cancelButtonColor: '#dc3545',
    confirmButtonText,
    cancelButtonText,
  }).then((res: SweetAlertResult<any>): boolean => {
    if (res.value) return true;

    return false;
  });
};

export const loadData = (title: string, html: string): void => {
  Swal.fire({
    title,
    html,
    willOpen: (): void => {
      Swal.showLoading(null);
    },
  });
};

export const closeAlert = (): void => {
  Swal.close();
};

export const infoEventAlert = async (
  title: string,
  html: string,
  typeAlert: TYPE_ALERT = TYPE_ALERT.WARNING
): Promise<SweetAlertResult<boolean>> => {
  return await Swal.fire({
    title,
    html,
    icon: typeAlert,
    preConfirm: (): boolean => {
      return true;
    },
  });
};

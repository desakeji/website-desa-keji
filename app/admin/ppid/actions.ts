// app/admin/ppid/actions.ts

'use server';

import {
  revalidatePath,
} from 'next/cache';

import {
  redirect,
} from 'next/navigation';

import {
  createClient,
} from '@/lib/server';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PpidActionState,
} from '@/types/ppid';

async function requireAdmin() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return user;
}

function getFormString(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ''
  ).trim();
}

function normalizeTelepon(
  value: string
) {
  if (!value) {
    return '';
  }

  const hasPlus =
    value.startsWith('+');

  const angka =
    value.replace(/\D/g, '');

  return hasPlus
    ? `+${angka}`
    : angka;
}

function validateEmail(
  email: string
) {
  if (!email) {
    return;
  }

  const valid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  if (!valid) {
    throw new Error(
      'Alamat email PPID tidak valid.'
    );
  }
}

function validateTelepon(
  telepon: string
) {
  if (!telepon) {
    return;
  }

  const angka =
    telepon.replace(/\D/g, '');

  if (
    angka.length < 8 ||
    angka.length > 15
  ) {
    throw new Error(
      'Nomor telepon harus terdiri dari 8 sampai 15 angka.'
    );
  }
}

function revalidatePpidPages() {
  revalidatePath('/admin');
  revalidatePath('/admin/ppid');

  revalidatePath('/ppid');
  revalidatePath('/ppid/profil');
  revalidatePath('/ppid/apa-itu-ppid');
}

export async function updateProfilPpidAction(
  _previousState: PpidActionState,
  formData: FormData
): Promise<PpidActionState> {
  await requireAdmin();

  try {
    const judul =
      getFormString(
        formData,
        'judul'
      );

    const deskripsi =
      getFormString(
        formData,
        'deskripsi'
      );

    const email =
      getFormString(
        formData,
        'email'
      );

    const telepon =
      normalizeTelepon(
        getFormString(
          formData,
          'telepon'
        )
      );

    const alamat =
      getFormString(
        formData,
        'alamat'
      );

    const jamLayanan =
      getFormString(
        formData,
        'jam_layanan'
      );

    const aktif =
      getFormString(
        formData,
        'aktif'
      ) === 'on';

    if (
      judul.length < 5 ||
      judul.length > 180
    ) {
      throw new Error(
        'Judul profil harus terdiri dari 5 sampai 180 karakter.'
      );
    }

    if (
      deskripsi.length < 20 ||
      deskripsi.length > 5000
    ) {
      throw new Error(
        'Deskripsi profil harus terdiri dari 20 sampai 5000 karakter.'
      );
    }

    if (alamat.length > 1000) {
      throw new Error(
        'Alamat maksimal 1000 karakter.'
      );
    }

    if (
      jamLayanan.length > 180
    ) {
      throw new Error(
        'Jam pelayanan maksimal 180 karakter.'
      );
    }

    validateEmail(email);
    validateTelepon(telepon);

    const {
      error,
    } = await supabaseAdmin
      .from('profil_ppid')
      .upsert(
        {
          profil_key:
            'utama',

          judul,
          deskripsi,

          email:
            email || null,

          telepon:
            telepon || null,

          alamat:
            alamat || null,

          jam_layanan:
            jamLayanan || null,

          aktif,
        },
        {
          onConflict:
            'profil_key',
        }
      );

    if (error) {
      throw new Error(
        `Profil PPID gagal diperbarui: ${error.message}`
      );
    }

    revalidatePpidPages();

    return {
      error: null,
      success:
        'Profil PPID berhasil diperbarui.',
    };
  } catch (error) {
    console.error(
      'Update profil PPID error:',
      error
    );

    return {
      error:
        error instanceof Error
          ? error.message
          : 'Profil PPID gagal diperbarui.',

      success: null,
    };
  }
}

export async function createPengurusPpidAction(
  _previousState: PpidActionState,
  formData: FormData
): Promise<PpidActionState> {
  await requireAdmin();

  try {
    const nama =
      getFormString(
        formData,
        'nama'
      );

    const jabatanDesa =
      getFormString(
        formData,
        'jabatan_desa'
      );

    const jabatanPpid =
      getFormString(
        formData,
        'jabatan_ppid'
      );

    const urutanValue =
      getFormString(
        formData,
        'urutan'
      );

    const aktif =
      getFormString(
        formData,
        'aktif'
      ) === 'on';

    if (
      nama.length < 3 ||
      nama.length > 150
    ) {
      throw new Error(
        'Nama pengurus harus terdiri dari 3 sampai 150 karakter.'
      );
    }

    if (
      jabatanDesa.length < 3 ||
      jabatanDesa.length > 150
    ) {
      throw new Error(
        'Jabatan desa harus terdiri dari 3 sampai 150 karakter.'
      );
    }

    if (
      jabatanPpid.length < 3 ||
      jabatanPpid.length > 180
    ) {
      throw new Error(
        'Jabatan dalam PPID harus terdiri dari 3 sampai 180 karakter.'
      );
    }

    const urutan =
      Number(urutanValue);

    if (
      !Number.isInteger(urutan) ||
      urutan < 0 ||
      urutan > 999
    ) {
      throw new Error(
        'Urutan pengurus tidak valid.'
      );
    }

    const {
      error,
    } = await supabaseAdmin
      .from('ppid_pengurus')
      .insert({
        nama,

        jabatan_desa:
          jabatanDesa,

        jabatan_ppid:
          jabatanPpid,

        urutan,
        aktif,
      });

    if (error) {
      throw new Error(
        `Pengurus PPID gagal ditambahkan: ${error.message}`
      );
    }

    revalidatePpidPages();

    return {
      error: null,
      success:
        'Pengurus PPID berhasil ditambahkan.',
    };
  } catch (error) {
    console.error(
      'Create pengurus PPID error:',
      error
    );

    return {
      error:
        error instanceof Error
          ? error.message
          : 'Pengurus PPID gagal ditambahkan.',

      success: null,
    };
  }
}

export async function togglePengurusPpidAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getFormString(
      formData,
      'id'
    );

  const aktif =
    getFormString(
      formData,
      'aktif'
    ) === 'true';

  if (!id) {
    throw new Error(
      'ID pengurus tidak valid.'
    );
  }

  const {
    data,
    error,
  } = await supabaseAdmin
    .from('ppid_pengurus')
    .update({
      aktif: !aktif,
    })
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) {
    throw new Error(
      `Status pengurus gagal diperbarui: ${error.message}`
    );
  }

  if (!data) {
    throw new Error(
      'Data pengurus tidak ditemukan.'
    );
  }

  revalidatePpidPages();
}

export async function deletePengurusPpidAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getFormString(
      formData,
      'id'
    );

  if (!id) {
    throw new Error(
      'ID pengurus tidak valid.'
    );
  }

  const {
    data,
    error,
  } = await supabaseAdmin
    .from('ppid_pengurus')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) {
    throw new Error(
      `Pengurus PPID gagal dihapus: ${error.message}`
    );
  }

  if (!data) {
    throw new Error(
      'Data pengurus tidak ditemukan.'
    );
  }

  revalidatePpidPages();
}
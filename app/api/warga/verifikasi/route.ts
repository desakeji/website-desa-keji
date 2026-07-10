import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nik = String(body?.nik ?? '').replace(/\D/g, '');

    if (!/^\d{16}$/.test(nik)) {
      return NextResponse.json(
        {
          valid: false,
          message: 'NIK harus terdiri dari tepat 16 angka.',
        },
        { status: 400 }
      );
    }

    const { data: warga, error } = await supabaseAdmin
      .from('warga')
      .select('nik')
      .eq('nik', nik)
      .eq('status_aktif', true)
      .maybeSingle();

    if (error) {
      console.error('Kesalahan verifikasi NIK:', error);

      return NextResponse.json(
        {
          valid: false,
          message: 'Terjadi kesalahan saat memverifikasi NIK.',
        },
        { status: 500 }
      );
    }

    if (!warga) {
      return NextResponse.json(
        {
          valid: false,
          message:
            'NIK tidak terdaftar sebagai warga aktif Desa Keji.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      message: 'NIK terverifikasi sebagai warga Desa Keji.',
    });
  } catch (error) {
    console.error('Kesalahan API verifikasi warga:', error);

    return NextResponse.json(
      {
        valid: false,
        message: 'Permintaan tidak dapat diproses.',
      },
      { status: 500 }
    );
  }
}
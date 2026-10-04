"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const senha = formData.get("senha");

  if (!email || !senha) {
    return { error: "Preencha todos os campos." };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { error: "E-mail ou senha incorretos." };
    }

    const senhaValida = await bcrypt.compare(senha, admin.senha);

    if (!senhaValida) {
      return { error: "E-mail ou senha incorretos." };
    }

    await createSession(admin.id, admin.email);
  } catch (err) {
    console.error("Erro na Server Action de login:", err);
    return { error: "Ocorreu um erro no servidor. Tente novamente." };
  }

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
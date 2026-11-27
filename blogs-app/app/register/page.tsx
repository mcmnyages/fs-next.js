"use client"

import { useActionState } from "react"

import { registerUser } from "@/app/actions/users"
import RegisterForm from "./components/RegisterForm"

const initialState = { error: "" }

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, initialState)

  return <RegisterForm formAction={formAction} error={state.error} pending={pending} />
}

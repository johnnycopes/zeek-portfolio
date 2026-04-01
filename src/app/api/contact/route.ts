import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, projectType, budget, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const to = process.env.CONTACT_EMAIL ?? 'info@zacharykiernan.com'

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `New inquiry from ${name}${projectType ? ` — ${projectType}` : ''}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      projectType ? `Project Type: ${projectType}` : null,
      budget ? `Budget: ${budget}` : null,
      `\nMessage:\n${message}`,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

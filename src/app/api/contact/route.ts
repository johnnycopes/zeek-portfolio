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

  const { name, email, company, services, projectValue, fixedBudget, timeline, projectDetails } = body

  if (!name || !email || !projectDetails) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const to = process.env.CONTACT_EMAIL ?? 'info@zacharykiernan.com'

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `New inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      services?.length ? `Services: ${services.join(', ')}` : null,
      projectValue ? `Project Value: ${projectValue}` : null,
      fixedBudget ? `Fixed Budget: ${fixedBudget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      `\nProject Details:\n${projectDetails}`,
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

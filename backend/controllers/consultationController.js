const Consultation = require('../models/Consultation');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// Create Nodemailer Transporter
const createTransporter = () => {
  // Read SMTP parameters from Env, fall back to Ethereal/mock config
  const host = process.env.SMTP_HOST || 'smtp.ethereal.email';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('SMTP Credentials missing. Nodemailer falling back to standard console logs.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // Use SSL on 465
    auth: {
      user,
      pass
    }
  });
};

// Send email notifications
const sendEmails = async (consultation) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const studioEmail = process.env.STUDIO_RECEIVER_EMAIL || 'inquire@auradesignstudio.com';
  
  // HTML Layout styles matching the luxury charcoal (#1F2937) and gold (#D4AF37) branding
  const clientHtml = `
    <div style="font-family: 'Playfair Display', Georgia, serif; background-color: #F8F8F8; padding: 40px; color: #1F2937;">
      <div style="max-width: 600px; margin: 0 auto; bg-color: #FFFFFF; background: #FFFFFF; border: 1px solid rgba(212, 175, 55, 0.2); padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="letter-spacing: 0.15em; font-weight: 300; font-size: 24px; color: #1F2937; margin: 0;">AURA &amp; CO.</h2>
          <div style="width: 30px; height: 1px; bg-color: #D4AF37; background: #D4AF37; margin: 10px auto;"></div>
          <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #D4AF37;">Luxury Architecture &amp; Interior Design</span>
        </div>
        
        <p style="font-size: 14px; line-height: 1.6; font-family: sans-serif; color: #4B5563;">Dear ${consultation.name},</p>
        
        <p style="font-size: 14px; line-height: 1.6; font-family: sans-serif; color: #4B5563;">
          We have successfully received your design briefing profile for the location <strong>${consultation.location}</strong>. Thank you for inviting Aura &amp; Co. to review your architectural vision.
        </p>

        <div style="background-color: #F9FAFB; border-left: 2px solid #D4AF37; padding: 15px; margin: 25px 0;">
          <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #1F2937;">Selected Profile Summary:</h4>
          <table style="width: 100%; font-size: 12px; font-family: sans-serif; border-collapse: collapse; color: #4B5563;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 40%;">Project Type:</td>
              <td style="padding: 4px 0;">${consultation.projectType}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Preferred Style:</td>
              <td style="padding: 4px 0;">${consultation.designStyle}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Estimated Budget:</td>
              <td style="padding: 4px 0;">${consultation.budget}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 14px; line-height: 1.6; font-family: sans-serif; color: #4B5563;">
          Our design coordinators will contact you within 24 business hours to arrange a private briefing meeting.
        </p>

        <p style="font-size: 14px; line-height: 1.6; font-family: sans-serif; color: #4B5563; margin-top: 30px;">
          Warm regards,<br />
          <strong>The Design Directorate</strong><br />
          AURA &amp; CO. Studio
        </p>
      </div>
      <div style="text-align: center; font-size: 10px; color: #9CA3AF; margin-top: 20px; font-family: sans-serif;">
        &copy; ${new Date().getFullYear()} AURA &amp; CO. | Beverly Hills &bull; Manhattan &bull; London
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: sans-serif; padding: 20px; background-color: #f3f4f6;">
      <div style="background-color: #ffffff; padding: 30px; border-top: 4px solid #D4AF37; max-width: 600px; margin: 0 auto;">
        <h2 style="margin-top: 0; font-size: 18px; color: #1f2937;">New Consultation Request Received</h2>
        <p style="font-size: 14px; color: #4b5563;">A new client briefing form has been submitted. Details below:</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 20px 0;">
          <tr style="background-color: #f9fafb;">
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb; width: 30%;">Client Name</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${consultation.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb;">Email</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="mailto:${consultation.email}">${consultation.email}</a></td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb;">Phone</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${consultation.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb;">Location</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${consultation.location}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb;">Project Type</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${consultation.projectType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb;">Budget Range</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${consultation.budget}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb;">Style Preference</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${consultation.designStyle}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border: 1px solid #e5e7eb; vertical-align: top;">Client Message</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${consultation.message}</td>
          </tr>
        </table>
        
        <p style="font-size: 12px; color: #9ca3af;">Submitted at: ${consultation.createdAt}</p>
      </div>
    </div>
  `;

  try {
    // Send to client
    await transporter.sendMail({
      from: `"Aura & Co." <${studioEmail}>`,
      to: consultation.email,
      subject: 'Aura & Co. | Consultation Briefing Received',
      html: clientHtml
    });

    // Send copy to studio administrators
    await transporter.sendMail({
      from: `"Studio Web Portal" <${studioEmail}>`,
      to: studioEmail,
      subject: `[New Lead] Consultation: ${consultation.name} - ${consultation.location}`,
      html: adminHtml
    });

    console.log('Nodemailer dispatched notification emails to client and admin.');
  } catch (error) {
    console.error(`Nodemailer delivery failure: ${error.message}`);
  }
};

// POST /api/consultation Controller
exports.createConsultation = async (req, res) => {
  // Express-validator validation results check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }

  try {
    const { name, email, phone, location, projectType, budget, designStyle, message } = req.body;

    const newConsultation = new Consultation({
      name,
      email,
      phone,
      location,
      projectType,
      budget,
      designStyle,
      message
    });

    // Save submission to MongoDB
    const savedConsultation = await newConsultation.save();
    
    // Asynchronously dispatch notification emails
    sendEmails(savedConsultation);

    res.status(201).json({
      success: true,
      message: 'Consultation profile saved successfully.',
      data: savedConsultation
    });
  } catch (error) {
    console.error(`Create consultation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to register consultation. Internal server error.'
    });
  }
};

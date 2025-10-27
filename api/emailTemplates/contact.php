<?php

function getContactEmailTemplate(array $contactData): string {
    $name = htmlspecialchars($contactData['name']);
    $email = htmlspecialchars($contactData['email']);
    $subject = htmlspecialchars($contactData['subject']);
    $message = nl2br(htmlspecialchars($contactData['message']));
    $timestamp = $contactData['timestamp'];
    
    return "
    <!DOCTYPE html>
    <html lang='pl'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Nowa wiadomość kontaktowa - DevLink</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #1e293b, #334155);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: bold;
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 30px;
            }
            .field {
                margin-bottom: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #eab308;
            }
            .field-label {
                font-weight: bold;
                color: #1e293b;
                margin-bottom: 5px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .field-value {
                color: #374151;
                font-size: 16px;
            }
            .message-field {
                background: #f1f5f9;
                border-left-color: #3b82f6;
            }
            .footer {
                background: #f8f9fa;
                padding: 20px 30px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                border-top: 1px solid #e5e7eb;
            }
            .timestamp {
                background: #e0f2fe;
                color: #0369a1;
                padding: 10px 15px;
                border-radius: 6px;
                font-size: 14px;
                margin-top: 20px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🔔 Nowa wiadomość kontaktowa</h1>
                <p>DevLink - Platforma dla społeczności IT</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='field-label'>👤 Imię</div>
                    <div class='field-value'>{$name}</div>
                </div>
                
                <div class='field'>
                    <div class='field-label'>📧 Email</div>
                    <div class='field-value'>{$email}</div>
                </div>
                
                <div class='field'>
                    <div class='field-label'>📝 Temat</div>
                    <div class='field-value'>{$subject}</div>
                </div>
                
                <div class='field message-field'>
                    <div class='field-label'>💬 Wiadomość</div>
                    <div class='field-value'>{$message}</div>
                </div>
                
                <div class='timestamp'>
                    📅 Otrzymano: {$timestamp}
                </div>
            </div>
            
            <div class='footer'>
                <p>Ta wiadomość została wysłana przez formularz kontaktowy na stronie DevLink</p>
                <p>Odpowiedz na email: <strong>{$email}</strong></p>
            </div>
        </div>
    </body>
    </html>
    ";
}

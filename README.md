# ECE Take-Home

### Getting Started
- Bash
- npm install
- npm run dev
- Access the application at /apply via the local Next.js port.

### PII & Security Handling
To minimize exposure of sensitive data:

- Encryption: SSNs are encrypted server-side before being stored in memory.
- API responses do not return submitted PII.
- UI clears/hides sensitive values immediately after submission.
- Downstream records exclude the SSN entirely.
- Logging: Request payloads and sensitive fields are excluded from error or response logs.
- Raw SSNs exist in memory only for validation before being discarded or encrypted.

### Business Rules & Triage
An application is flagged for manual_review if any of the following occur:
- Requested Amount: Exceeds $1000.
- Age: Applicant is under 18 years old.
- SSN: Matches suspicious or unusual patterns that should be reviewed manually.
- Contact: Phone number fails basic validity checks.

### Downstream Handoff
A separate Handoff Record is generated to simulate integration with external systems. This record contains only necessary metadata, intentionally excluding the SSN.

### Validation Strategy

- Validation is intentionally separated from business rules so the API can reject truly invalid input while still allowing potentially valid, but suspicious, applications to be reviewed.

Client-Side:

- Provides immediate feedback for a better user experience.
- Catches common input issues before submission.

Server-Side:

- Acts as the source of truth.
- Re-validates all submitted data, even if client-side validation is bypassed.

### Server validation includes:

- Format: Email, 10-digit phone number, SSN, and ZIP / ZIP+4.
- Geography: Valid 2-letter US state codes.
- Logic: Positive dollar amounts, strict DOB parsing, and required agreement checkbox validation.
- Required Fields: Ensures all non-optional applicant and program fields are present.

### Validation vs. Triage:

- Structurally invalid SSNs are rejected.
- Correctly formatted but suspicious SSNs are accepted and flagged for manual review instead.
- Testing & AI Usage
- Testing Focus: Coverage is prioritized for triage logic, authentication, and sensitive-data handling.

### AI Collaboration: 
- AI was used for text completion, naming suggestions, and a checklist to verify the assessment was complete. Also for the building of this README.
- All AI suggestions were manually reviewed.

### Future Roadmap

If granted additional time, the following enhancements would be prioritized:

Integration: Expanded API-level testing for validation edge cases and successful submission flows.
Efficiency: Unified validation schemas to reduce duplication between client and server.
Safety: Stronger redaction utilities for any future logging or debugging workflows.
Security: Basic rate limiting and abuse protections for the submission endpoint.
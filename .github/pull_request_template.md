# PR Checklist

Asana Task: [Title](link)

## Description

Explain what this change delivers (web, mobile, shared packages, infra, etc.).

## Testing

- [ ] Web app linted (`yarn lint`)
- [ ] Web build succeeded (`yarn build:web`)
- [ ] Mobile build succeeded (`yarn build:mobile`)
- [ ] Manual smoke test performed

## Deployment

- [ ] Ready for staging (deploys to dev on push to `main`)
- [ ] Requires manual prod release
- [ ] Bucket names or AWS role need updates (documented below)

## Security / Privacy

- [ ] Security reviewed (if applicable)
- [ ] Privacy review completed (if applicable)

## Follow-up

- [ ] Update Asana task status
- [ ] Notify stakeholders or docs owners
- [ ] Additional cleanup after deployment

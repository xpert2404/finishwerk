$project = 'c:\Users\Tyron\Documents\Work\Projects\nuetzliche.it'
Set-Location $project
npm run test:e2e
exit $LASTEXITCODE

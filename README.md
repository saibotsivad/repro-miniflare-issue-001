# Miniflare issue with `--env`

When using `--mount` in sub-directories and `--env` the filename passed in is ignored.

## Working

If the filename is the default `.env`

```bash
npm run dev-working
```

Or simply:

```bash
miniflare --env ./route-b/.env \
  --mount a=./route-a \
  --mount b=./route-b \
  --watch \
  --debug \
  -p 3000
```

When accessing the route [http://localhost:3000/b](http://localhost:3000/b) you see:

```
Hello from B! {"variable_b":"value_b"}
```

## Not Working

If the filename is not the default `.env.test`

```bash
npm run dev-broken
```

Or simply:

```bash
miniflare --env ./route-a/.env.test \
  --mount a=./route-a \
  --mount b=./route-b \
  --watch \
  --debug \
  -p 3000
```

### What I expect

The response should be:

```
Hello from A! {"variable_a":"value_a"}
```

### What actually happens

The response is simply:

```
Hello from A! {}
```

And the error is logged:

```
ReferenceError: MY_KEY_A is not defined
    at /path/to/repro-miniflare-issue-001/route-a/worker/index.js:4:3
    at /path/to/repro-miniflare-issue-001/node_modules/@miniflare/shared/src/event.ts:29:9
    at EventTarget.<anonymous> (/path/to/repro-miniflare-issue-001/node_modules/@miniflare/shared/src/event.ts:77:9)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:562:20)
    at EventTarget.dispatchEvent (node:internal/event_target:504:26)
    at EventTarget.dispatchEvent (/path/to/repro-miniflare-issue-001/node_modules/@miniflare/shared/src/event.ts:63:18)
    at EventTarget.dispatchEvent (/path/to/repro-miniflare-issue-001/node_modules/@miniflare/shared/src/event.ts:87:26)
    at EventTarget.[kDispatchFetch] (/path/to/repro-miniflare-issue-001/node_modules/@miniflare/core/src/standards/event.ts:356:13)
    at EventTarget.[kDispatchFetch] (/path/to/repro-miniflare-issue-001/node_modules/@miniflare/core/src/index.ts:1067:31)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

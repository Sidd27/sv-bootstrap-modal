# sv-bootstrap-modal

Bootstrap 5 modal component for Svelte 5.

### Demo

[Live demo](https://sidd27.github.io/sv-bootstrap-modal/)

## Installation

```bash
npm install sv-bootstrap-modal
```

### Requirements

- Node >= 24
- Svelte 5
- Bootstrap 5 CSS included globally in your project

## Usage

### Basic

```svelte
<script>
  import Modal from 'sv-bootstrap-modal';
  let isOpen = $state(false);
</script>

<button class="btn btn-primary" onclick={() => (isOpen = true)}
  >Open Modal</button
>

<Modal bind:open={isOpen}>
  <div class="modal-header">
    <h5 class="modal-title">Modal title</h5>
    <button type="button" class="btn-close" onclick={() => (isOpen = false)}
    ></button>
  </div>
  <div class="modal-body">Modal body text.</div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      onclick={() => (isOpen = false)}>Close</button
    >
    <button type="button" class="btn btn-primary">Save changes</button>
  </div>
</Modal>
```

### Sizing

Pass Bootstrap dialog classes via `dialogClasses`:

| Size        | Class      |
| ----------- | ---------- |
| Small       | `modal-sm` |
| Large       | `modal-lg` |
| Extra large | `modal-xl` |

```svelte
<Modal bind:open={isOpen} dialogClasses="modal-lg">...</Modal>
```

### Vertically centered

```svelte
<Modal bind:open={isOpen} dialogClasses="modal-dialog-centered">...</Modal>
```

### Scrollable

```svelte
<Modal bind:open={isOpen} dialogClasses="modal-dialog-scrollable">...</Modal>
```

### No animation

```svelte
<Modal bind:open={isOpen} animated={false}>...</Modal>
```

## Props

| Name             | Type       | Default     | Description                                                 |
| ---------------- | ---------- | ----------- | ----------------------------------------------------------- |
| `open`           | `boolean`  | `false`     | Controls modal visibility; use `bind:open`                  |
| `backdrop`       | `boolean`  | `true`      | Renders the backdrop overlay                                |
| `ignoreBackdrop` | `boolean`  | `false`     | When `true`, clicking the backdrop does not close the modal |
| `keyboard`       | `boolean`  | `true`      | Closes the modal on Escape key                              |
| `animated`       | `boolean`  | `true`      | Enables fade/fly transitions                                |
| `zIndex`         | `number`   | `undefined` | Override z-index on the modal (backdrop gets `zIndex - 5`)  |
| `dialogClasses`  | `string`   | `""`        | Extra classes added to `.modal-dialog`                      |
| `labelledby`     | `string`   | `""`        | `aria-labelledby` value                                     |
| `describedby`    | `string`   | `""`        | `aria-describedby` value                                    |
| `onOpened`       | `function` | `() => {}`  | Callback fired after the modal finishes opening             |
| `onClosed`       | `function` | `() => {}`  | Callback fired after the modal finishes closing             |

## Accessibility

- Focus moves to the first focusable element (or the modal itself) on open and returns to the previously focused element on close.
- Tab and Shift+Tab are trapped within the modal while it is open.
- Escape closes the modal when `keyboard` is `true`.

## License

[Apache License 2.0](https://github.com/Sidd27/sv-bootstrap-modal/blob/master/LICENSE)

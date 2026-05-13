<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  let {
    open = $bindable(false),
    dialogClasses = '',
    backdrop = true,
    ignoreBackdrop = false,
    keyboard = true,
    describedby = '',
    labelledby = '',
    onOpened = () => {},
    onClosed = () => {},
    animated = true,
    zIndex = undefined,
    children,
  } = $props();

  let modalEl = $state(null);
  let _keyboardEvent;
  let _previousFocus;

  const modalFadeParams = $derived(animated ? {} : { duration: 0 });
  const dialogInParams = $derived(
    animated ? { y: -50, duration: 300 } : { y: 0, duration: 0 }
  );
  const dialogOutParams = $derived(
    animated
      ? { y: -50, duration: 300, easing: quintOut }
      : { y: 0, duration: 0 }
  );
  const backdropParams = $derived(
    animated ? { duration: 150 } : { duration: 0 }
  );
  const backdropZIndex = $derived(zIndex != null ? zIndex - 5 : undefined);

  function attachEvent(target, ...args) {
    target.addEventListener(...args);
    return { remove: () => target.removeEventListener(...args) };
  }

  function getFocusable() {
    return modalEl ? Array.from(modalEl.querySelectorAll(FOCUSABLE)) : [];
  }

  function handleBackdrop(event) {
    if (backdrop && !ignoreBackdrop) {
      event.stopPropagation();
      open = false;
    }
  }

  function handleBackdropKey(event) {
    if (keyboard && event.key === 'Escape') {
      open = false;
    }
  }

  function onModalOpened() {
    _previousFocus = document.activeElement;
    (getFocusable()[0] ?? modalEl)?.focus();

    if (keyboard) {
      _keyboardEvent = attachEvent(document, 'keydown', (e) => {
        if (e.key === 'Escape') {
          open = false;
        } else if (e.key === 'Tab') {
          const els = getFocusable();
          if (!els.length) return;
          const first = els[0];
          const last = els[els.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }
    onOpened();
  }

  function onModalClosed() {
    if (_keyboardEvent) {
      _keyboardEvent.remove();
      _keyboardEvent = null;
    }
    _previousFocus?.focus();
    onClosed();
  }

  // Manage body class reactively; cleanup fn covers the destroy-while-open case
  $effect(() => {
    if (open) {
      document.body.classList.add('modal-open');
      return () => document.body.classList.remove('modal-open');
    }
  });

  // Safety-net cleanup on unmount (e.g. route change while modal is open)
  $effect(() => {
    return () => {
      document.body.classList.remove('modal-open');
      _keyboardEvent?.remove();
    };
  });
</script>

{#if open}
  <div
    class="modal show"
    tabindex="-1"
    role="dialog"
    aria-labelledby={labelledby}
    aria-describedby={describedby}
    aria-modal="true"
    style:z-index={zIndex}
    onclick={handleBackdrop}
    onkeydown={handleBackdropKey}
    onintroend={onModalOpened}
    onoutroend={onModalClosed}
    bind:this={modalEl}
    transition:fade={modalFadeParams}
  >
    <div
      class="modal-dialog {dialogClasses}"
      in:fly={dialogInParams}
      out:fly={dialogOutParams}
    >
      <div class="modal-content">
        {@render children?.()}
      </div>
    </div>
  </div>
  <div
    class="modal-backdrop show"
    style:z-index={backdropZIndex}
    transition:fade={backdropParams}
  ></div>
{/if}

<style>
  .modal {
    display: block;
  }
</style>

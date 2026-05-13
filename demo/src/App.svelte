<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Modal from 'sv-bootstrap-modal';

  let basicOpen = $state(false);
  let sizeOpen = $state(false);
  let centeredOpen = $state(false);
  let scrollableOpen = $state(false);
  let staticOpen = $state(false);
  let selectedSize = $state('modal-lg');

  function openSize(size) {
    selectedSize = size;
    sizeOpen = true;
  }
</script>

<div class="container py-5">
  <div class="mb-5">
    <h1 class="mb-1">sv-bootstrap-modal</h1>
    <p class="text-muted">Bootstrap 5 modal component for Svelte 5</p>
  </div>

  <div class="row g-4">
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Basic modal</h5>
          <p class="card-text text-muted">
            Default modal with header, body, and footer.
          </p>
          <button class="btn btn-primary" onclick={() => (basicOpen = true)}>
            Open modal
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Sizes</h5>
          <p class="card-text text-muted">
            Control width with <code>dialogClasses</code>.
          </p>
          <div class="d-flex gap-2 flex-wrap">
            <button
              class="btn btn-outline-primary btn-sm"
              onclick={() => openSize('modal-sm')}>Small</button
            >
            <button
              class="btn btn-outline-primary btn-sm"
              onclick={() => openSize('')}>Default</button
            >
            <button
              class="btn btn-outline-primary btn-sm"
              onclick={() => openSize('modal-lg')}>Large</button
            >
            <button
              class="btn btn-outline-primary btn-sm"
              onclick={() => openSize('modal-xl')}>X-Large</button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Vertically centered</h5>
          <p class="card-text text-muted">
            Pass <code>modal-dialog-centered</code> to
            <code>dialogClasses</code>.
          </p>
          <button class="btn btn-primary" onclick={() => (centeredOpen = true)}>
            Open centered
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Scrollable body</h5>
          <p class="card-text text-muted">
            Pass <code>modal-dialog-scrollable</code> to
            <code>dialogClasses</code>.
          </p>
          <button
            class="btn btn-primary"
            onclick={() => (scrollableOpen = true)}
          >
            Open scrollable
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Static backdrop</h5>
          <p class="card-text text-muted">
            Set <code>ignoreBackdrop</code> and <code>keyboard={false}</code> to prevent
            closing on click/Esc.
          </p>
          <button class="btn btn-primary" onclick={() => (staticOpen = true)}>
            Open static
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Basic modal -->
<Modal bind:open={basicOpen}>
  <div class="modal-header">
    <h5 class="modal-title">Basic modal</h5>
    <button
      type="button"
      class="btn-close"
      onclick={() => (basicOpen = false)}
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    <p>
      This is a basic modal using sv-bootstrap-modal with Svelte 5 and Bootstrap
      5.
    </p>
    <p>Click the backdrop or press <kbd>Esc</kbd> to close.</p>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      onclick={() => (basicOpen = false)}>Close</button
    >
    <button type="button" class="btn btn-primary">Save changes</button>
  </div>
</Modal>

<!-- Size modal -->
<Modal bind:open={sizeOpen} dialogClasses={selectedSize}>
  <div class="modal-header">
    <h5 class="modal-title">Size: <code>{selectedSize || 'default'}</code></h5>
    <button
      type="button"
      class="btn-close"
      onclick={() => (sizeOpen = false)}
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    <p>This modal uses <code>dialogClasses="{selectedSize}"</code>.</p>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      onclick={() => (sizeOpen = false)}>Close</button
    >
  </div>
</Modal>

<!-- Centered modal -->
<Modal bind:open={centeredOpen} dialogClasses="modal-dialog-centered">
  <div class="modal-header">
    <h5 class="modal-title">Vertically centered</h5>
    <button
      type="button"
      class="btn-close"
      onclick={() => (centeredOpen = false)}
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    <p>
      This modal is centered vertically on the page using <code
        >dialogClasses="modal-dialog-centered"</code
      >.
    </p>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      onclick={() => (centeredOpen = false)}>Close</button
    >
  </div>
</Modal>

<!-- Scrollable modal -->
<Modal bind:open={scrollableOpen} dialogClasses="modal-dialog-scrollable">
  <div class="modal-header">
    <h5 class="modal-title">Scrollable body</h5>
    <button
      type="button"
      class="btn-close"
      onclick={() => (scrollableOpen = false)}
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    {#each { length: 20 } as _item, i (i)}
      <p>Paragraph {i + 1} — scrollable content goes here.</p>
    {/each}
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      onclick={() => (scrollableOpen = false)}>Close</button
    >
  </div>
</Modal>

<!-- Static backdrop modal -->
<Modal bind:open={staticOpen} ignoreBackdrop keyboard={false}>
  <div class="modal-header">
    <h5 class="modal-title">Static backdrop</h5>
  </div>
  <div class="modal-body">
    <p>
      This modal ignores backdrop clicks and the <kbd>Esc</kbd> key. You must use
      the button below to close it.
    </p>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-primary"
      onclick={() => (staticOpen = false)}>Got it</button
    >
  </div>
</Modal>

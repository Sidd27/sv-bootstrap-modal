import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import Modal from '../src/Modal.svelte';

afterEach(() => {
  cleanup();
  document.body.classList.remove('modal-open');
});

describe('rendering', () => {
  it('does not render when open is false', () => {
    render(Modal, { open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open is true', async () => {
    render(Modal, { open: true });
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders slot content', async () => {
    render(Modal, { open: true });
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('body class', () => {
  it('adds modal-open to body when open', async () => {
    render(Modal, { open: true });
    await tick();
    expect(document.body).toHaveClass('modal-open');
  });

  it('removes modal-open from body when closed', async () => {
    const { rerender } = render(Modal, { open: true });
    await tick();
    await rerender({ open: false });
    await tick();
    expect(document.body).not.toHaveClass('modal-open');
  });

  it('removes modal-open from body when unmounted while open', async () => {
    const { unmount } = render(Modal, { open: true });
    await tick();
    expect(document.body).toHaveClass('modal-open');
    unmount();
    await tick();
    expect(document.body).not.toHaveClass('modal-open');
  });
});

describe('keyboard', () => {
  it('closes when Escape is pressed on modal', async () => {
    render(Modal, { open: true });
    await tick();
    await fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    // outro transition completes asynchronously via animation polyfill
    await vi.waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('does not close on Escape when keyboard is false', async () => {
    render(Modal, { open: true, keyboard: false });
    await tick();
    await fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('backdrop', () => {
  it('closes when backdrop is clicked', async () => {
    render(Modal, { open: true });
    await tick();
    await fireEvent.click(screen.getByRole('dialog'));
    await vi.waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('does not close when ignoreBackdrop is true', async () => {
    render(Modal, { open: true, ignoreBackdrop: true });
    await tick();
    await fireEvent.click(screen.getByRole('dialog'));
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not close when backdrop is false', async () => {
    render(Modal, { open: true, backdrop: false });
    await tick();
    await fireEvent.click(screen.getByRole('dialog'));
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('callbacks', () => {
  it('calls onOpened after introend fires', async () => {
    const onOpened = vi.fn();
    render(Modal, { open: true, onOpened });
    await tick();
    fireEvent(screen.getByRole('dialog'), new Event('introend'));
    await tick();
    expect(onOpened).toHaveBeenCalledOnce();
  });

  it('calls onClosed after outroend fires', async () => {
    const onClosed = vi.fn();
    render(Modal, { open: true, onClosed });
    await tick();
    fireEvent(screen.getByRole('dialog'), new Event('outroend'));
    await tick();
    expect(onClosed).toHaveBeenCalledOnce();
  });
});

describe('z-index', () => {
  it('applies zIndex style when provided', async () => {
    render(Modal, { open: true, zIndex: 2000 });
    await tick();
    expect(screen.getByRole('dialog')).toHaveStyle('z-index: 2000');
  });

  it('does not apply z-index style when not provided', async () => {
    render(Modal, { open: true });
    await tick();
    expect(screen.getByRole('dialog')).not.toHaveStyle('z-index: 1055');
  });
});

import { cn } from '../utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional');
  });

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null)).toBe('base');
  });

  it('handles Tailwind conflicts correctly', () => {
    // tailwind-merge should resolve conflicting utilities
    expect(cn('px-4', 'px-6')).toBe('px-6');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles complex conditional logic', () => {
    const isActive = true;
    const isDisabled = false;
    const variant = 'primary';

    const result = cn(
      'base-class',
      {
        'active': isActive,
        'disabled': isDisabled,
        [`variant-${variant}`]: variant
      }
    );

    expect(result).toContain('base-class');
    expect(result).toContain('active');
    expect(result).toContain('variant-primary');
    expect(result).not.toContain('disabled');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('handles arrays of classes', () => {
    expect(cn(['px-4', 'py-2'], 'text-center')).toBe('px-4 py-2 text-center');
  });
});
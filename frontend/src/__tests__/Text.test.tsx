import {render, screen} from '@testing-library/react';
import Text from '../components/shared/text/Text';
import { expect, test } from '@jest/globals';

test('text shows text', () => {
    render(<Text variant='body_md' >Text</Text>);
    // @ts-expect-error 111
    expect(screen.getByText(/Text/i)).toBeInTheDocument();
});
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../src/components/atoms/Button';
import '../../src/styles/_button.scss';

const ButtonStory = () => (
    <section>
        {/*TODO Use headline component*/}
        <h1 className="vp-type-headline1">Buttons</h1>
        <Button size={'small'}>Small Primary Button</Button>
        <Button size={'small'} importance={'secondary'}>
            Small Secondary Button
        </Button>
        <Button size={'small'} importance={'tertiary'}>
            Small Tertiary Button
        </Button>
    </section>
);

storiesOf('Button', module).add('Small Buttons', ButtonStory);

import * as React from 'react';
import { Flex } from 'lib/Flex';

import './header.scss';

const BLOCK = 'lib__header';

type HeaderProps = React.PropsWithChildren<{}>

export const Header = ({children}: HeaderProps) => {
		return <Flex align="stretch" className={BLOCK} isFullWidth>{children}</Flex>
}

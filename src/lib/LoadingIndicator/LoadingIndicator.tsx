import './loading-indicator.scss';

const BLOCK = 'lib__loading-indicator';

export const LoadingIndicator = () => {
	return <svg width="25" height="25" viewBox="0 0 24 24">
	  <path className={`${BLOCK}__arc`} d="M2 10 A 10 10 0 0 1 12 2" fill="none" stroke="black" stroke-width="2px"></path>
	</svg>
}

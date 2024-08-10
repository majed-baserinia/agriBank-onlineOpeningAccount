export type Props = {
	className?: string;
	children: React.ReactNode;
};

export default function Slide({ className, children }: Props) {
	return <li className={`glide__slide ${className}`}>{children}</li>;
}

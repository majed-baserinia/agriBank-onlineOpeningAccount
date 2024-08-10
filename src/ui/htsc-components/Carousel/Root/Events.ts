type DefaultEvents =
	| 'run.after'
	| 'run.before'
	| 'mount.before'
	| 'mount.after'
	| 'update'
	| 'destroy'
	| 'play'
	| 'pause';

export type MappedEvent<T extends string> = T extends `${infer X}.${infer Y}`
	? `on${Capitalize<Y>}${Capitalize<X>}`
	: `on${Capitalize<T>}`;

export type MappedEvents = {
	[K in DefaultEvents as MappedEvent<K>]: K;
};

export type GlideEvents = {
	[K in keyof MappedEvents as K]?: (...args: any) => void;
};

const MAPPED_EVENTS: { [K in DefaultEvents as K]: MappedEvent<K> } = {
	'run.after': 'onAfterRun',
	'run.before': 'onBeforeRun',
	'mount.after': 'onAfterMount',
	'mount.before': 'onBeforeMount',
	update: 'onUpdate',
	destroy: 'onDestroy',
	play: 'onPlay',
	pause: 'onPause'
};

export function mappedEventToGlideEvent(name: string): DefaultEvents {
	const originalEventName = Object.entries(MAPPED_EVENTS).find(([key, value]) => value == name);
	if (!originalEventName) {
		throw new Error(`cannot map "${name}" to a glidejs event`);
	}
	return originalEventName[0] as DefaultEvents;
}

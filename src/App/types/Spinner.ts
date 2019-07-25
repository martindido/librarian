import { StatelessComponent } from 'react';

export type SpinnerProps = {
    size?: number;
    animationDuration?: number;
    color?: string;
    className?: string;
    style?: object;
};

export type AtomSpinner = StatelessComponent<SpinnerProps>;
export type BreedingRhombusSpinner = StatelessComponent<SpinnerProps>;
export type CirclesToRhombusesSpinner = StatelessComponent<SpinnerProps>;
export type FingerprintSpinner = StatelessComponent<SpinnerProps>;
export type FlowerSpinner = StatelessComponent<SpinnerProps>;
export type FulfillingBouncingCircleSpinner = StatelessComponent<SpinnerProps>;
export type FulfillingSquareSpinner = StatelessComponent<SpinnerProps>;
export type HalfCircleSpinner = StatelessComponent<SpinnerProps>;
export type HollowDotsSpinner = StatelessComponent<SpinnerProps>;
export type IntersectingCirclesSpinner = StatelessComponent<SpinnerProps>;
export type LoopingRhombusesSpinner = StatelessComponent<SpinnerProps>;
export type OrbitSpinner = StatelessComponent<SpinnerProps>;
export type PixelSpinner = StatelessComponent<SpinnerProps>;
export type RadarSpinner = StatelessComponent<SpinnerProps>;
export type ScalingSquaresSpinner = StatelessComponent<SpinnerProps>;
export type SelfBuildingSquareSpinner = StatelessComponent<SpinnerProps>;
export type SemipolarSpinner = StatelessComponent<SpinnerProps>;
export type SpringSpinner = StatelessComponent<SpinnerProps>;
export type SwappingSquaresSpinner = StatelessComponent<SpinnerProps>;
export type TrinityRingsSpinner = StatelessComponent<SpinnerProps>;

export type Spinners = {
    AtomSpinner: AtomSpinner;
    BreedingRhombusSpinner: BreedingRhombusSpinner;
    CirclesToRhombusesSpinner: CirclesToRhombusesSpinner;
    FingerprintSpinner: FingerprintSpinner;
    FlowerSpinner: FlowerSpinner;
    FulfillingBouncingCircleSpinner: FulfillingBouncingCircleSpinner;
    FulfillingSquareSpinner: FulfillingSquareSpinner;
    HalfCircleSpinner: HalfCircleSpinner;
    HollowDotsSpinner: HollowDotsSpinner;
    IntersectingCirclesSpinner: IntersectingCirclesSpinner;
    LoopingRhombusesSpinner: LoopingRhombusesSpinner;
    OrbitSpinner: OrbitSpinner;
    PixelSpinner: PixelSpinner;
    RadarSpinner: RadarSpinner;
    ScalingSquaresSpinner: ScalingSquaresSpinner;
    SelfBuildingSquareSpinner: SelfBuildingSquareSpinner;
    SemipolarSpinner: SemipolarSpinner;
    SpringSpinner: SpringSpinner;
    SwappingSquaresSpinner: SwappingSquaresSpinner;
    TrinityRingsSpinner: TrinityRingsSpinner;
};

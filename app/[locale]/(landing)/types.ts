export type StatItem = {
  value: string;
  label: string;
};
export type Service = {
  title: string;
  description: string;
  features: string[];
  icon: string;
  bg: string;
};
export type ProblemAndSolutionFeatureItem = {
  title: string;
  description: string;
  icon: string;
}
export type BenefitItem = {
  title: string
  description: string
  icon: string
}
export type ServicesDetailsProps ={
  id: number;
  tag:string;
  title: string;
  desc: string;
  sub_desc: string;
  features: string[];
  bg:string;
}
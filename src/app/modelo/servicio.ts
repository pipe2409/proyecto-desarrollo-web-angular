export interface Servicio {
  id: number;
  title: string;        
  subtitle: string;     
  description: string;  
  image: string;        
  features: string[];   
  precio?: number;
}
import {
    Breadcrumb as BreadcrumbRoot,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbList,
    BreadcrumbPage    
} from '@/components/ui/breadcrumb';


interface BreadcrumbItemProps {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItemProps[];
}

function Breadcrumb( {items}: BreadcrumbProps) {

    return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {
            items.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-[#1C65DA] font-medium">
                    <BreadcrumbItem>
                        
                        {item.href ? (
                            <BreadcrumbLink href={item.href}>
                            
                            {item.label}
                            
                            </BreadcrumbLink>
                        ) 
                        : 
                        (
                        
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        
                        )}
                    
                    </BreadcrumbItem>
                    
                    {index < items.length - 1 && <BreadcrumbSeparator />}

                </div>
        ))}
      </BreadcrumbList>
      
    </BreadcrumbRoot>
  )
}


export default Breadcrumb;
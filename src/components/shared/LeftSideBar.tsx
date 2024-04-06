import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import React, { useEffect, useState } from "react";
import { EllipsisIcon } from "../icons/Ellipsis";
const LeftSideBar = () => {
  const {user} = useUserContext();
  const {pathname} = useLocation();
  const {mutateAsync: signOut, isSuccess} = useSignOutAccount();
  const navigate = useNavigate();
  const [mouseDown, setMouseDown] = useState(false);
  const [width, setWidth] = useState(300);

  const handleResizeMouseDown = (event: React.MouseEvent) => {
    setMouseDown(true);
    event.preventDefault();
  };

  const handleMouseUp = (_event: React.MouseEvent) => {
    setMouseDown(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (mouseDown) {
      setWidth(event.pageX);
      console.log(width)
    }
  }; 

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess]);

  return (
    <nav className='leftsidebar'
    style={{ width: `${width}px` }}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}>
        <div className='flex flex-col gap-11'>
            <Link to = '/' className='pt-5 hidden md:block'>
                <img src='/assets/images/logo.svg' alt='logo' width={170} height={36} />
            </Link>
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                <img
                src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
                alt = 'profile'
                className='h-8 w-8 rounded-full'
                />
                {width >= 200 && < div className='flex flex-col'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='body-bold'>{user.name.length > 10 ? `${user.name.slice(0, 10)}...` : user.name}</TooltipTrigger>
                            <TooltipContent className="shad-tooltip">
                                <p>{user.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='small-regular text-light-3 '>@{user.username.length > 15 ? `${user.username.slice(0, 15)}...` : user.username}</TooltipTrigger>                
                            <TooltipContent className="shad-tooltip">
                                <p>{user.username}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                }
            </Link>
            <ul className="flex flex-col gap-6">
                {sidebarLinks.map((link: INavLink) => {
                    const isActive = pathname === link.route;
                    return (
                        <li
                        key={link.label}
                        className={(`leftsidebar-link group ${
                            isActive && 'bg-primary-500'
                        }`)}
                        >
                        <NavLink
                            to={link.route}
                            className='flex gap-4 items-center p-4'
                        >
                            <img 
                            src={link.imgURL} 
                            alt={link.label}
                            className={(`group-hover:invert-white ${isActive && 'invert-white'}`)} />
                            {width >= 150 && <p>{link.label}</p>}
                        </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
        <Button variant="ghost" className="shad-button_ghost flex" onClick={() => {
            signOut();
        }}>
            <img src='/assets/icons/logout.svg' alt='plus icon' />
            {width >= 150 && <p className="small-medium md:base-medium">Logout</p>}
        </Button>
        <div  onMouseDown={handleResizeMouseDown}>
            <EllipsisIcon />
        </div>
    </nav>
  )
}

export default LeftSideBar

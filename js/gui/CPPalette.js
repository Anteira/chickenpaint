/*
	ChibiPaint
    Copyright (c) 2006-2008 Marc Schefer

    This file is part of ChibiPaint.

    ChibiPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChibiPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChibiPaint. If not, see <http://www.gnu.org/licenses/>.

 */

function CPPalette(cpController, className, title) {
    "use strict";
    
    this.cpController = cpController;
    this.title = title;
    this.name = className;
    
    var
        containerElement = document.createElement("div"),
        headElement = document.createElement("div"),
        closeButton = document.createElement("button"),
        bodyElement = document.createElement("div"),
        
        dragging,
        dragOffset,
        
        that = this;
    
    this.getElement = function() {
        return containerElement;
    };
    
    this.getBodyElement = function() {
        return bodyElement;
    };
    
    this.getWidth = function() {
        return $(containerElement).width();
    };
    
    this.getHeight = function() {
        return $(containerElement).height();
    };
    
    this.getX = function() {
        return parseInt(containerElement.style.left, 10) || 0;
    };
    
    this.getY = function() {
        return parseInt(containerElement.style.top, 10) || 0;
    };
    
    this.setLocation = function(x, y) {
        containerElement.style.left = x + "px";
        containerElement.style.top = y + "px";
    };
    
    this.setWidth = function(width) {
        containerElement.style.width = width + "px";
    };

    this.setHeight = function(height) {
        containerElement.style.height = height + "px";
    };
    
    this.setSize = function(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };
    
    function mouseDrag(e) {
        that.setLocation(e.pageX - dragOffset.x, e.pageY - dragOffset.y);
    }

    function mouseDragRelease(e) {
        dragging = false;
        
        window.removeEventListener("mousemove", mouseDrag);
        window.removeEventListener("mouseup", mouseDragRelease);
    }

    closeButton.type = "button";
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    
    containerElement.className = "chickenpaint-palette chickenpaint-palette-" + className;
    
    headElement.className = "chickenpaint-palette-head";

    var
        headTitle = document.createElement("h4");
    
    headTitle.className = 'modal-title';
    headTitle.appendChild(document.createTextNode(this.title))
    
    headElement.appendChild(closeButton);
    headElement.appendChild(headTitle);
    
    bodyElement.className = "chickenpaint-palette-body";
    
    containerElement.appendChild(headElement);
    containerElement.appendChild(bodyElement);
    
    headElement.addEventListener("mousedown", function(e) {
        if (e.button == 0) {/* Left */
            if (e.target.nodeName == "BUTTON") {
                that.emitEvent("paletteVisChange", [that, false]);
            } else {
                dragging = true;
                
                window.addEventListener("mousemove", mouseDrag);
                window.addEventListener("mouseup", mouseDragRelease);
                
                dragOffset = {x: e.pageX - $(containerElement).position().left, y: e.pageY - $(containerElement).position().top};
            }
        }
    });
}

CPPalette.prototype = Object.create(EventEmitter.prototype);
CPPalette.prototype.constructor = EventEmitter;